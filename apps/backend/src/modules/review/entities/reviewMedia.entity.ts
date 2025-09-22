import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReviewMedia {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  url: string;

  @Field()
  width: number;

  @Field()
  height: number;

  @Field({ nullable: true })
  duration?: number;

  @Field({ nullable: true })
  alt?: string;
}
