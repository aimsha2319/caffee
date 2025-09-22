import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Review } from '../../review/entities/review.entity';
import { MenuItem } from './menu-item.entity';

@ObjectType()
export class Place {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  geohash: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field(() => [String])
  cuisineTags: string[];

  @Field()
  priceLevel: number;

  @Field(() => [String])
  amenities: string[];

  @Field(() => [String])
  photos: string[];

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => [MenuItem], { nullable: true })
  menuItems?: MenuItem[];

  @Field(() => [Review], { nullable: true })
  reviews?: Review[];

  @Field({ nullable: true })
  claimStatus?: string;

  @Field({ nullable: true })
  ownerId?: string;

  @Field(() => PlaceScore, { nullable: true })
  ranking?: PlaceScore;
}

@ObjectType()
export class PlaceScore {
  @Field(() => Float)
  composite: number;

  @Field(() => Float)
  overall: number;

  @Field(() => Float)
  recency: number;

  @Field(() => Float)
  trust: number;
}
