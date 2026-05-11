export interface RecommendationAction {

  type?:
    | "remove_tool"
    | "downgrade_plan"
    | "reduce_seats"
    | "merge_tools";

  tool?: string;

  targetToolId?: string;

  fromPlan?: string;

  toPlan?: string;

  currentPlan?: string;

  recommendedPlan?: string;

  currentPrice?: number;

  recommendedPrice?: number;

  currentSeats?: number;

  recommendedSeats?: number;

  maxSeatsReducible?: number;

  seatsToRemove?: number;

  secondaryTool?: string;
}

export interface Recommendation {

  id: string;

  title: string;

  description: string;

  impact?:
    | "High"
    | "Medium"
    | "Low";

  risk?: string;

  warning?: string;

  current?: string;

  recommended?: string;

  savings?: number;

  action?: RecommendationAction;
}

export interface ToolSelection {

  id: string;

  name: string;

  plan: string;

  pricePerSeat: number;

  seats: number;

  category?: string;
}

export interface AuditResult {

  id?: string;

  // STACK

  tools:
    ToolSelection[];

  optimizedStack?:
    ToolSelection[];

  // SPEND

  totalMonthlySpend?: number;

  totalYearlySpend?: number;

  originalSpend?: number;

  optimizedSpend?: number;

  monthlySavings?: number;

  yearlySavings?: number;

  savingsPercentage?: number;

  // ANALYTICS

  optimizationScore?: number;

  productivityRisk?: string;

  spendPerEmployee?: number;

  benchmarkMessage?: string;

  totalPotentialSavings?: number;

  warnings?: string[];

  summary?: string;

  // ENGINE OUTPUT

  recommendations:
    Recommendation[];
}

export interface AuditInput {

  tools:
    ToolSelection[];

  teamSize: number;

  useCase:
    | "coding"
    | "writing"
    | "research"
    | "data"
    | "mixed";
}