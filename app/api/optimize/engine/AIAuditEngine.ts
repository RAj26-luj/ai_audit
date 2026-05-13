import type { AuditInput } from "../types/AuditInput";
import type { AuditRule } from "../types/AuditRule";

import {
  RecommendationAction,
  type Recommendation,
} from "../types/Recommendation";

//audit engine
export default class AIAuditEngine {
  private rules: AuditRule[];

 //load rules
  constructor(rules: AuditRule[]) {
    this.rules = rules;
  }

  //run audit
  run(input: AuditInput) {
    let recommendations: Recommendation[] = [];

   //apply rules
    for (const rule of this.rules) {
      recommendations.push(...rule.evaluate(input));
    }

    //clean duplicates
    recommendations =
      this.normalizeRecommendations(recommendations);

   //sort savings
    return recommendations.sort(
      (a, b) => b.savings - a.savings
    );
  }

 //remove conflicts
  private normalizeRecommendations(
    recs: Recommendation[]
  ) {
    const cancelledIds = new Set<string>();

    //track removals
    recs.forEach((r) => {
      if (
        r.action.type === RecommendationAction.CANCEL ||
        r.action.type ===
        RecommendationAction.CONSOLIDATE
      ) {
        r.action.targetIds?.forEach(
          (id) => cancelledIds.add(id)
        );
      }
    });

   //filter overlaps
    return recs.filter((r) => {
      if (
        r.action.type ===
        RecommendationAction.REDUCE_SEATS
      ) {
        const overlap =
          r.action.targetIds?.some(
           (id) => cancelledIds.has(id)
          );

        return !overlap;
      }

      return true;
    });
  }
}