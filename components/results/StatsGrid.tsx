import {
  TrendingDown,
  BarChart3,
  DollarSign,
  Briefcase,
} from "lucide-react";

import type {
  AuditResult,
} from "@/lib/audit";

import StatCard from "./StatCard";
import OptimizationScore from "./OptimizationScore";

type Props = {
  data: AuditResult;
};

export default function StatsGrid({
  data,
}: Props) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">

      <StatCard
        label="Estimated Yearly Waste"

        value={
          data.estimatedWasteYearly || 0
        }

        subtext="Potential yearly savings"

        icon={TrendingDown}

        primary
      />

      <StatCard
        label="Monthly Waste"

        value={
          data.estimatedWasteMonthly || 0
        }

        subtext="Recurring monthly inefficiency"

        icon={BarChart3}
      />

      <StatCard
        label="Potential Savings"

        value={
          data.totalPotentialSavings || 0
        }

        subtext="Estimated optimization impact"

        icon={DollarSign}
      />

      <StatCard
        label="Spend Per Employee"

        value={
          data.spendPerEmployee || 0
        }

        subtext="Monthly AI spend per team member"

        icon={Briefcase}
      />

      <OptimizationScore
        score={
          data.optimizationScore || 0
        }
      />
    </div>
  );
}