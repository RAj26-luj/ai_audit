//actions
export enum RecommendationAction {
  CANCEL = "cancel_tool",
  DOWNGRADE = "downgrade_plan",
  REDUCE_SEATS = "reduce_seats",
  CONSOLIDATE = "consolidate_tools",
}

//risk levels
export type ProductivityRisk =
  | "Low"
  | "Medium"
  | "High";

//recommendation type
export interface Recommendation {
  id: string;
  title: string;
  description: string;

  savings: number;
  confidenceScore: number;

  productivityRisk: ProductivityRisk;

  action: {
    type: RecommendationAction;

    tool?: string;
    targetIds?: string[];

    toPlan?: string;
    recommendedPrice?: number;

    seatsToRemove?: number;
  };
}