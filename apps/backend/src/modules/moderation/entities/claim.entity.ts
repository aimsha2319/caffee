import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Claim {
  @Field(() => ID)
  id: string;

  @Field()
  placeId: string;

  @Field()
  requesterId: string;

  @Field()
  status: string;

  @Field(() => [String])
  documents: string[];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  reviewedAt?: Date;
}
