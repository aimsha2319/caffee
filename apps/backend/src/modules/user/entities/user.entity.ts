import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  handle: string;

  @Field({ nullable: true })
  photoUrl?: string;

  @Field()
  isCreator: boolean;

  @Field()
  isOwner: boolean;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [String])
  dietPreferences: string[];

  @Field()
  trustScore: number;

  @Field()
  trustTier: string;

  @Field()
  createdAt: Date;
}
