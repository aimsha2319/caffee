import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ClaimPlaceInput {
  @Field(() => ID)
  placeId: string;

  @Field(() => [String])
  documents: string[];
}

@InputType()
export class OwnerReplyInput {
  @Field(() => ID)
  reviewId: string;

  @Field()
  message: string;
}
