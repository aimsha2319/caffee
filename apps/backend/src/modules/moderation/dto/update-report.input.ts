import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ModerateReportInput {
  @Field(() => ID)
  reportId: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  resolutionNote?: string;
}
