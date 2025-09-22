import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { MenuItem } from '../../place/entities/menu-item.entity';

@ObjectType()
export class ReviewItem {
  @Field(() => ID)
  id: string;

  @Field(() => MenuItem)
  menuItem: MenuItem;

  @Field(() => Float)
  rating: number;

  @Field({ nullable: true })
  notes?: string;
}
