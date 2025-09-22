import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { ClaimPlaceInput, OwnerReplyInput } from './dto/claim-place.input';
import { Comment } from '../review/entities/comment.entity';
import { Claim } from '../moderation/entities/claim.entity';

@Resolver()
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Mutation(() => Claim)
  claimPlace(@Args('input') input: ClaimPlaceInput) {
    const ownerId = 'owner-demo';
    return this.ownerService.claimPlace(ownerId, input);
  }

  @Mutation(() => Comment)
  ownerReply(@Args('input') input: OwnerReplyInput) {
    const ownerId = 'owner-demo';
    return this.ownerService.postOwnerReply(ownerId, input);
  }
}
