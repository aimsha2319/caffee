import { Field, Float, ID, InputType, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class ReviewItemInput {
  @Field(() => ID)
  menuItemId: string;

  @Field(() => Float)
  rating: number;

  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export class ReviewMediaInput {
  @Field()
  url: string;

  @Field()
  type: string;

  @Field()
  width: number;

  @Field()
  height: number;

  @Field({ nullable: true })
  duration?: number;

  @Field({ nullable: true })
  alt?: string;
}

@InputType()
export class CreateReviewInput {
  @Field(() => ID)
  placeId: string;

  @Field(() => Float)
  overall: number;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  visitType?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  visitAt?: Date;

  @Field({ nullable: true })
  partySize?: number;

  @Field({ nullable: true })
  waitMinutes?: number;

  @Field(() => [ReviewItemInput])
  items: ReviewItemInput[];

  @Field(() => [ReviewMediaInput])
  media: ReviewMediaInput[];
}

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  reviewId: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field()
  text: string;
}
