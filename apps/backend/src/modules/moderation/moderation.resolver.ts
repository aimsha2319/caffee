import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModerationService } from './moderation.service';
import { Report } from './entities/report.entity';
import { ModerateReportInput } from './dto/update-report.input';

@Resolver()
export class ModerationResolver {
  constructor(private readonly moderationService: ModerationService) {}

  @Query(() => [Report])
  moderationQueue() {
    return this.moderationService.getReports();
  }

  @Mutation(() => Report)
  moderateReport(@Args('input') input: ModerateReportInput) {
    return this.moderationService.moderate(input);
  }
}
