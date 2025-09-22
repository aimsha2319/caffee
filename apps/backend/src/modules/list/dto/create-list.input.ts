import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateListInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isCollaborative: boolean;
}

@InputType()
export class AddListItemInput {
  @Field(() => ID)
  listId: string;

  @Field(() => ID)
  placeId: string;

  @Field({ nullable: true })
  note?: string;
}
