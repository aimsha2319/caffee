import { Field, InputType, Float, Int } from '@nestjs/graphql';

@InputType()
export class BoundsInput {
  @Field(() => Float)
  north: number;

  @Field(() => Float)
  south: number;

  @Field(() => Float)
  east: number;

  @Field(() => Float)
  west: number;
}

@InputType()
export class PlaceFilterInput {
  @Field({ nullable: true })
  query?: string;

  @Field({ nullable: true })
  openNow?: boolean;

  @Field(() => [String], { nullable: true })
  cuisines?: string[];

  @Field(() => [String], { nullable: true })
  diets?: string[];

  @Field(() => [Int], { nullable: true })
  priceLevels?: number[];

  @Field(() => [String], { nullable: true })
  vibes?: string[];

  @Field(() => [String], { nullable: true })
  coffeeFilters?: string[];

  @Field(() => BoundsInput, { nullable: true })
  bounds?: BoundsInput;
}
