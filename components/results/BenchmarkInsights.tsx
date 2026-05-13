import {
  ShieldCheck,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

import BenchmarkHeader from "./benchmark/BenchmarkHeader";
import MetricCard from "./benchmark/MetricCard";
import OptimizationAnalysis from "./benchmark/OptimizationAnalysis";
import HealthSummary from "./benchmark/HealthSummary";

type Props = {
  spendPerEmployee: number;
  optimizationScore: number;
  wastePercentage: number;
};

//benchmark insights
export default function BenchmarkInsights({
  spendPerEmployee,
  optimizationScore,
  wastePercentage,
}: Props) {

  const healthStatus =
    optimizationScore >= 85
      ? "Highly Optimized"
      : optimizationScore >= 70
      ? "Balanced"
      : "Needs Optimization";

  return (

    <section className="bg-white/5 rounded-3xl border border-white/10 p-8">

      {/* header */}
      <BenchmarkHeader healthStatus={healthStatus} />

      {/* metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <MetricCard
          icon={<BarChart3 size={22} className="text-indigo-400" />}
          label="Spend Efficiency"
          value={`$${spendPerEmployee}`}
          description="Current AI spend per employee based on active stack usage."
          progressColor="bg-indigo-500/10"
        />

        <MetricCard
          icon={<ShieldCheck size={22} className="text-emerald-400" />}
          label="Optimization Score"
          value={`${optimizationScore}/100`}
          description="Higher scores indicate better balance between savings and productivity."
          progress={optimizationScore}
          progressColor="bg-emerald-500/10"
        />

        <MetricCard
          icon={<AlertTriangle size={22} className="text-amber-400" />}
          label="Savings Opportunity"
          value={`${wastePercentage}%`}
          description="Percentage of spending the optimizer believes can be safely reduced."
          progress={wastePercentage}
          progressColor="bg-amber-500/10"
        />

      </div>

      {/* analysis */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

        <OptimizationAnalysis
          optimizationScore={optimizationScore}
          wastePercentage={wastePercentage}
        />

        <HealthSummary />

      </div>

    </section>
  );
}