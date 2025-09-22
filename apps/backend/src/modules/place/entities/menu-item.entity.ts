import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MenuItem {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => [String])
  allergens: string[];

  @Field({ nullable: true })
  roaster?: string;

  @Field({ nullable: true })
  process?: string;

  @Field(() => [String], { nullable: true })
  brewMethods?: string[];
}
