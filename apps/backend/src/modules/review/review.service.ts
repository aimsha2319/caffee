import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateCommentInput, CreateReviewInput } from './dto/create-review.input';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  findByPlace(placeId: string) {
    return this.prisma.review.findMany({
      where: { placeId },
      include: {
        media: true,
        itemsReviewed: { include: { menuItem: true } },
        user: true,
        comments: { include: { user: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createReview(userId: string, input: CreateReviewInput) {
    return this.prisma.review.create({
      data: {
        placeId: input.placeId,
        userId,
        overall: input.overall,
        text: input.text,
        visitType: input.visitType,
        visitAt: input.visitAt,
        partySize: input.partySize,
        waitMinutes: input.waitMinutes,
        itemsReviewed: {
          create: input.items.map((item) => ({
            menuItemId: item.menuItemId,
            rating: item.rating,
            notes: item.notes
          }))
        },
        media: {
          create: input.media.map((media) => ({
            ...media,
            userId,
            placeId: input.placeId
          }))
        }
      },
      include: {
        media: true,
        itemsReviewed: { include: { menuItem: true } },
        user: true,
        comments: { include: { user: true } }
      }
    });
  }

  async createComment(userId: string, input: CreateCommentInput) {
    return this.prisma.comment.create({
      data: {
        reviewId: input.reviewId,
        parentId: input.parentId,
        userId,
        text: input.text
      },
      include: { user: true }
    });
  }
}
