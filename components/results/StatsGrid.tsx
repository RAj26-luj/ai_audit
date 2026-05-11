import {
  TrendingDown,
  BarChart3,
  DollarSign,
  Briefcase,
} from "lucide-react";

import StatCard from "./StatCard";
import OptimizationScore from "./OptimizationScore";

type Props = {
  data: any;
};

export default function StatsGrid({
  data,
}: Props) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">

      <StatCard
        label="Yearly Savings"

        value={
          data.yearlySavings || 0
        }

        subtext="Estimated yearly optimization savings"

        icon={TrendingDown}

        primary
      />

      <StatCard
        label="Monthly Savings"

        value={
          data.monthlySavings || 0
        }

        subtext="Recurring monthly savings"

        icon={BarChart3}
      />

      <StatCard
        label="Optimized Spend"

        value={
          data.optimizedSpend || 0
        }

        subtext="Optimized monthly AI spend"

        icon={DollarSign}
      />

      <StatCard
        label="Spend Per Employee"

        value={
          data.spendPerEmployee || 0
        }

        subtext="Average AI spend per employee"

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