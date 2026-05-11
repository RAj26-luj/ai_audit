export interface Tool {

  id: string;

  name: string;

  plan: string;

  pricePerSeat: number;

  seats: number;

  category?: string;
}

export interface Recommendation {

  id: string;

  title: string;

  description: string;

  impact?: string;

  risk?: string;

  warning?: string;

  current?: string;

  recommended?: string;

  savings?: number;

  action?: {

    type?:
      | "optimize"
      | "reduce_seats"
      | "downgrade_plan"
      | "remove_tool"
      | "merge_tools";

    tool?: string;

    targetToolId?: string;

    currentSeats?: number;

    recommendedSeats?: number;

    currentPlan?: string;

    recommendedPlan?: string;
  };
}

export interface AuditResult {

  id?: string;

  // CURRENT USER STACK

  tools: Tool[];

  // ENGINE OUTPUT

  optimizedStack?: Tool[];

  recommendations:
    Recommendation[];

  warnings?: string[];

  // SPENDING

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

  summary?: string;
}