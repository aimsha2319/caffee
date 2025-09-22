import { Field, ObjectType } from '@nestjs/graphql';
import { Review } from '../../review/entities/review.entity';
import { List } from '../../list/entities/list.entity';
import { Place } from '../../place/entities/place.entity';

@ObjectType()
export class FeedCard {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  reason: string;

  @Field(() => Review, { nullable: true })
  review?: Review;

  @Field(() => List, { nullable: true })
  list?: List;

  @Field(() => Place, { nullable: true })
  place?: Place;
}
