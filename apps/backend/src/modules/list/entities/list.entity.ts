import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Place } from '../../place/entities/place.entity';

@ObjectType()
export class ListItem {
  @Field(() => Place)
  place: Place;

  @Field({ nullable: true })
  note?: string;

  @Field()
  addedAt: Date;
}

@ObjectType()
export class List {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  ownerId: string;

  @Field()
  isCollaborative: boolean;

  @Field(() => [ListItem])
  items: ListItem[];

  @Field({ nullable: true })
  coverMedia?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
