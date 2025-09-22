import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { CreateCommentInput, CreateReviewInput } from './dto/create-review.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review])
  reviews(@Args('placeId') placeId: string) {
    return this.reviewService.findByPlace(placeId);
  }

  @Mutation(() => Review)
  createReview(@Args('input') input: CreateReviewInput) {
    const mockUser = 'user-demo';
    return this.reviewService.createReview(mockUser, input);
  }

  @Mutation(() => Comment)
  createComment(@Args('input') input: CreateCommentInput) {
    const mockUser = 'user-demo';
    return this.reviewService.createComment(mockUser, input);
  }

  @ResolveField(() => [Comment])
  comments(@Parent() review: Review) {
    return review.comments ?? [];
  }
}
