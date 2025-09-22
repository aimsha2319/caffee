import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { ReviewMedia } from './reviewMedia.entity';
import { ReviewItem } from './reviewItem.entity';
import { Comment } from './comment.entity';

@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Field()
  placeId: string;

  @Field(() => User)
  user: User;

  @Field(() => Float)
  overall: number;

  @Field(() => Float, { nullable: true })
  food?: number;

  @Field(() => Float, { nullable: true })
  service?: number;

  @Field(() => Float, { nullable: true })
  ambience?: number;

  @Field(() => Float, { nullable: true })
  value?: number;

  @Field(() => Float, { nullable: true })
  consistency?: number;

  @Field(() => Float, { nullable: true })
  coffee?: number;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  visitType?: string;

  @Field({ nullable: true })
  visitAt?: Date;

  @Field({ nullable: true })
  partySize?: number;

  @Field({ nullable: true })
  waitMinutes?: number;

  @Field(() => [ReviewMedia])
  media: ReviewMedia[];

  @Field(() => [ReviewItem])
  itemsReviewed: ReviewItem[];

  @Field()
  isVerifiedVisit: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Comment])
  comments: Comment[];
}
