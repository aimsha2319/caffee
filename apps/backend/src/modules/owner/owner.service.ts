import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ClaimPlaceInput, OwnerReplyInput } from './dto/claim-place.input';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async claimPlace(userId: string, input: ClaimPlaceInput) {
    return this.prisma.claim.upsert({
      where: { placeId: input.placeId },
      create: {
        placeId: input.placeId,
        requesterId: userId,
        documents: input.documents
      },
      update: {
        requesterId: userId,
        documents: input.documents,
        status: 'pending'
      }
    });
  }

  async postOwnerReply(userId: string, input: OwnerReplyInput) {
    const place = await this.prisma.place.findFirst({ where: { ownerId: userId } });
    if (!place) {
      throw new Error('Owner has no claimed place');
    }
    return this.prisma.comment.create({
      data: {
        reviewId: input.reviewId,
        text: input.message,
        userId,
        isOwner: true
      },
      include: { user: true }
    });
  }
}
