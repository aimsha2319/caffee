import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { PlaceModule } from './modules/place/place.module';
import { ReviewModule } from './modules/review/review.module';
import { ListModule } from './modules/list/list.module';
import { UserModule } from './modules/user/user.module';
import { ModerationModule } from './modules/moderation/moderation.module';
import { OwnerModule } from './modules/owner/owner.module';
import { FeedModule } from './modules/feed/feed.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: true,
      subscriptions: {
        'graphql-ws': true
      }
    }),
    PlaceModule,
    ReviewModule,
    ListModule,
    UserModule,
    ModerationModule,
    OwnerModule,
    FeedModule,
    NotificationModule,
    AdminModule
  ]
})
export class AppModule {}
