import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { PlaceFilterInput } from './dto/place-filters.input';
import { RankingService } from '../../common/ranking.service';

@Injectable()
export class PlaceService {
  constructor(private readonly prisma: PrismaService, private readonly ranking: RankingService) {}

  async search(filters: PlaceFilterInput) {
    const results = await this.prisma.place.findMany({
      where: {
        name: filters.query ? { contains: filters.query, mode: 'insensitive' } : undefined,
        cuisineTags: filters.cuisines ? { hasSome: filters.cuisines } : undefined,
        priceLevel: filters.priceLevels && filters.priceLevels.length > 0 ? { in: filters.priceLevels } : undefined
      },
      include: {
        reviews: true,
        menuItems: true
      },
      take: 50
    });

    return results.map((place) => {
      const overall = place.averageOverall ?? 0;
      const recencyDays = place.latestReviewAt
        ? (Date.now() - place.latestReviewAt.getTime()) / (1000 * 60 * 60 * 24)
        : 365;
      const score = this.ranking.computeScore({
        overall,
        recencyDays,
        reviewerTrust: place.reviewerTrustAvg ?? 0.5,
        reviewDiversity: place.reviewDiversity ?? 0.5,
        consistency: place.consistencyScore ?? 0.5,
        mediaQuality: place.mediaQualityScore ?? 0.5,
        verifiedRatio: place.verifiedVisitRatio ?? 0.3,
        flaggedForBrigading: place.brigadeFlagged
      });
      return {
        ...place,
        ranking: {
          composite: score,
          overall,
          recency: recencyDays,
          trust: place.reviewerTrustAvg ?? 0.5
        }
      };
    });
  }

  findOne(id: string) {
    return this.prisma.place.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            media: true,
            itemsReviewed: true,
            user: true
          }
        },
        menuItems: true
      }
    });
  }
}
