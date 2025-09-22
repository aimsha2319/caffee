import { Query, Resolver } from '@nestjs/graphql';
import { FeedCard } from './entities/feed-card.entity';
import { FeedService } from './feed.service';

@Resolver(() => FeedCard)
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Query(() => [FeedCard])
  feed() {
    const userId = 'user-demo';
    return this.feedService.getFeed(userId);
  }
}
