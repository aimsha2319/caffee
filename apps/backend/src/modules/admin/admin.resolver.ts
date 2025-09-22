import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RankingService } from '../../common/ranking.service';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
class RankingWeightsModel {
  @Field(() => Float)
  qualityWeight: number;

  @Field(() => Float)
  recencyWeight: number;

  @Field(() => Float)
  trustWeight: number;

  @Field(() => Float)
  diversityWeight: number;

  @Field(() => Float)
  consistencyWeight: number;

  @Field(() => Float)
  mediaWeight: number;
}

@ObjectType()
class RankingTogglesModel {
  @Field()
  freezeOnAlerts: boolean;

  @Field()
  boostVerifiedVisits: boolean;

  @Field()
  suppressAdsInOrganic: boolean;
}

@Resolver()
export class AdminResolver {
  constructor(private readonly rankingService: RankingService) {}

  @Query(() => RankingWeightsModel)
  rankingWeights() {
    return this.rankingService.getWeights();
  }

  @Query(() => RankingTogglesModel)
  rankingToggles() {
    return this.rankingService.getToggles();
  }

  @Mutation(() => RankingWeightsModel)
  updateRankingWeights(
    @Args('qualityWeight', { type: () => Float, nullable: true }) qualityWeight?: number,
    @Args('recencyWeight', { type: () => Float, nullable: true }) recencyWeight?: number,
    @Args('trustWeight', { type: () => Float, nullable: true }) trustWeight?: number,
    @Args('diversityWeight', { type: () => Float, nullable: true }) diversityWeight?: number,
    @Args('consistencyWeight', { type: () => Float, nullable: true }) consistencyWeight?: number,
    @Args('mediaWeight', { type: () => Float, nullable: true }) mediaWeight?: number
  ) {
    return this.rankingService.updateWeights({
      qualityWeight,
      recencyWeight,
      trustWeight,
      diversityWeight,
      consistencyWeight,
      mediaWeight
    });
  }

  @Mutation(() => RankingTogglesModel)
  updateRankingToggles(
    @Args('freezeOnAlerts', { type: () => Boolean, nullable: true }) freezeOnAlerts?: boolean,
    @Args('boostVerifiedVisits', { type: () => Boolean, nullable: true }) boostVerifiedVisits?: boolean,
    @Args('suppressAdsInOrganic', { type: () => Boolean, nullable: true }) suppressAdsInOrganic?: boolean
  ) {
    return this.rankingService.updateToggles({ freezeOnAlerts, boostVerifiedVisits, suppressAdsInOrganic });
  }
}
