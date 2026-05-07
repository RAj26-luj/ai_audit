// top stats section

import {
  TrendingDown,
  BarChart3,
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <StatCard
        label="Estimated Yearly Waste"

        value={
          data.estimatedWasteYearly || 0
        }

        subtext="Potential savings opportunity"

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

      <OptimizationScore
        score={
          data.optimizationScore || 0
        }
      />
    </div>
  );
}