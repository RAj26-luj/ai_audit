import { TrendingUp } from "lucide-react";
import ProgressMetric from "./ProgressMetric";

interface Props {
  optimizationScore: number;
  wastePercentage: number;
}

//analysis card
export default function OptimizationAnalysis({
  optimizationScore,
  wastePercentage,
}: Props) {

  return (

    <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

      {/* header */}
      <div className="flex items-center gap-3 mb-5">

        <TrendingUp size={20} className="text-indigo-400" />

        <h4 className="text-xl font-bold">
          Optimization Analysis
        </h4>

      </div>

      {/* metrics */}
      <div className="space-y-5">

        <ProgressMetric
          label="Pricing Efficiency"
          value={Math.min(100, optimizationScore + 5)}
          color="bg-indigo-500"
        />

        <ProgressMetric
          label="Seat Optimization"
          value={Math.max(40, optimizationScore - 8)}
          color="bg-emerald-500"
        />

        <ProgressMetric
          label="Productivity Protection"
          value={Math.max(55, 100 - wastePercentage)}
          color="bg-amber-400"
        />

      </div>

    </div>
  );
}