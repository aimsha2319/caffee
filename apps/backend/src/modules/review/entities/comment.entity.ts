import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field(() => User)
  user: User;

  @Field({ nullable: true })
  parentId?: string;

  @Field()
  isOwner: boolean;

  @Field()
  createdAt: Date;
}
