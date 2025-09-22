import { Injectable } from '@nestjs/common';
import { DefaultRankingToggles, DefaultRankingWeights, RankingToggles, RankingWeights } from '@caffee/types';

@Injectable()
export class RankingService {
  private weights: RankingWeights = { ...DefaultRankingWeights };
  private toggles: RankingToggles = { ...DefaultRankingToggles };

  updateWeights(weights: Partial<RankingWeights>): RankingWeights {
    this.weights = { ...this.weights, ...weights };
    return this.weights;
  }

  updateToggles(toggles: Partial<RankingToggles>): RankingToggles {
    this.toggles = { ...this.toggles, ...toggles };
    return this.toggles;
  }

  getWeights(): RankingWeights {
    return this.weights;
  }

  getToggles(): RankingToggles {
    return this.toggles;
  }

  computeScore(params: {
    overall: number;
    recencyDays: number;
    reviewerTrust: number;
    reviewDiversity: number;
    consistency: number;
    mediaQuality: number;
    verifiedRatio: number;
    flaggedForBrigading?: boolean;
  }): number {
    const { overall, recencyDays, reviewerTrust, reviewDiversity, consistency, mediaQuality, verifiedRatio, flaggedForBrigading } = params;
    if (this.toggles.freezeOnAlerts && flaggedForBrigading) {
      return 0;
    }
    const recencyScore = Math.max(0, 1 - recencyDays / 180);
    const verifiedBoost = this.toggles.boostVerifiedVisits ? Math.min(1, verifiedRatio + 0.1) : verifiedRatio;
    const weighted =
      overall * this.weights.qualityWeight +
      recencyScore * this.weights.recencyWeight +
      reviewerTrust * this.weights.trustWeight +
      reviewDiversity * this.weights.diversityWeight +
      consistency * this.weights.consistencyWeight +
      mediaQuality * this.weights.mediaWeight;
    return weighted * (0.85 + verifiedBoost * 0.15);
  }
}
