import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field(() => GraphQLJSONObject)
  payload: Record<string, unknown>;

  @Field({ nullable: true })
  seenAt?: Date;

  @Field()
  createdAt: Date;
}
