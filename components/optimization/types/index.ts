//tool
export interface Tool {
  id: string;
  name: string;
  plan: string;
  pricePerSeat: number;
  seats: number;
  category?: string;
}

//recommendation
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
    type?: "optimize" | "reduce_seats" | "downgrade_plan" | "remove_tool" | "merge_tools";
    tool?: string;
    targetToolId?: string;
    currentSeats?: number;
    recommendedSeats?: number;
    currentPlan?: string;
    recommendedPlan?: string;
  };
}

//audit result
export interface AuditResult {
  id?: string;
  tools: Tool[];
  optimizedStack?: Tool[];
  recommendations: Recommendation[];

  warnings?: string[];

  totalMonthlySpend?: number;
  totalYearlySpend?: number;

  originalSpend?: number;
  optimizedSpend?: number;

  monthlySavings?: number;
  yearlySavings?: number;

  savingsPercentage?: number;
  optimizationScore?: number;
  productivityRisk?: string;

  spendPerEmployee?: number;
  benchmarkMessage?: string;
  summary?: string;
}