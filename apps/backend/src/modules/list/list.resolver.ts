import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { AddListItemInput, CreateListInput } from './dto/create-list.input';

@Resolver(() => List)
export class ListResolver {
  constructor(private readonly listService: ListService) {}

  @Query(() => List)
  list(@Args('id') id: string) {
    return this.listService.findById(id);
  }

  @Query(() => [List])
  myLists() {
    const userId = 'user-demo';
    return this.listService.listsForUser(userId);
  }

  @Mutation(() => List)
  createList(@Args('input') input: CreateListInput) {
    const userId = 'user-demo';
    return this.listService.create(userId, input);
  }

  @Mutation(() => List)
  addListItem(@Args('input') input: AddListItemInput) {
    const userId = 'user-demo';
    return this.listService.addItem(userId, input);
  }
}
