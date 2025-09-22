import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  @Field()
  entityType: string;

  @Field()
  entityId: string;

  @Field()
  reporterId: string;

  @Field()
  reason: string;

  @Field({ nullable: true })
  details?: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  resolutionNote?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
