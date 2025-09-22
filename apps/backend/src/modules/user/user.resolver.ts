import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('handle') handle: string) {
    return this.userService.findByHandle(handle);
  }
}
