import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeed(userId: string) {
    const recentReviews = await this.prisma.review.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        media: true,
        itemsReviewed: { include: { menuItem: true } },
        comments: { include: { user: true } }
      }
    });
    return recentReviews.map((review) => ({
      id: `review-${review.id}`,
      type: 'review',
      reason: 'Trending near you',
      review
    }));
  }
}
