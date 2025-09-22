import { Query, Resolver } from '@nestjs/graphql';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => [Notification])
  notifications() {
    const userId = 'user-demo';
    return this.notificationService.list(userId);
  }
}
