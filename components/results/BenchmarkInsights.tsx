import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

type Props = {
  spendPerEmployee: number;
  optimizationScore: number;
  wastePercentage: number;
};

export default function BenchmarkInsights({
  spendPerEmployee,
  optimizationScore,
  wastePercentage,
}: Props) {

  const healthStatus =
    optimizationScore >= 80
      ? "Healthy"
      : optimizationScore >= 65
      ? "Moderate"
      : "Needs Optimization";

  return (
    <section className="bg-white/5 rounded-3xl border border-white/10 p-8">

      {/* header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">

        <div>

          <h3 className="text-3xl font-black">

            Benchmark Insights

          </h3>

          <p className="text-gray-400 mt-2">

            AI stack efficiency and optimization benchmarks.

          </p>

        </div>

        <div className="px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold">

          Stack Health:
          {" "}
          {healthStatus}

        </div>

      </div>

      {/* top metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* spend */}
        <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-5">

            <BarChart3
              size={22}
              className="text-indigo-400"
            />

          </div>

          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">

            Spend Efficiency

          </p>

          <p className="text-4xl font-black">

            ${spendPerEmployee}

          </p>

          <p className="text-sm text-gray-400 mt-3 leading-6">

            Monthly AI spend per employee across your current stack.

          </p>

        </div>

        {/* score */}
        <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">

            <ShieldCheck
              size={22}
              className="text-emerald-400"
            />

          </div>

          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">

            Optimization Score

          </p>

          <p className="text-4xl font-black">

            {optimizationScore}
            <span className="text-lg text-gray-500">
              /100
            </span>

          </p>

          <div className="mt-4 w-full h-2 rounded-full bg-white/10 overflow-hidden">

            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{
                width: `${optimizationScore}%`,
              }}
            />

          </div>

          <p className="text-sm text-gray-400 mt-3 leading-6">

            Overall operational efficiency of your AI tooling stack.

          </p>

        </div>

        {/* waste */}
        <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-5">

            <AlertTriangle
              size={22}
              className="text-amber-400"
            />

          </div>

          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">

            Estimated Waste

          </p>

          <p className="text-4xl font-black">

            {wastePercentage}%

          </p>

          <div className="mt-4 w-full h-2 rounded-full bg-white/10 overflow-hidden">

            <div
              className="h-full bg-amber-400 rounded-full"
              style={{
                width: `${wastePercentage}%`,
              }}
            />

          </div>

          <p className="text-sm text-gray-400 mt-3 leading-6">

            Estimated recurring overspend caused by inefficiencies.

          </p>

        </div>

      </div>

      {/* bottom analytics */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* left */}
        <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

          <div className="flex items-center gap-3 mb-5">

            <TrendingUp
              size={20}
              className="text-indigo-400"
            />

            <h4 className="text-xl font-bold">

              Optimization Potential

            </h4>

          </div>

          <div className="space-y-5">

            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-sm text-gray-400">

                  Tool Consolidation

                </span>

                <span className="text-sm font-semibold text-white">

                  82%

                </span>

              </div>

              <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                <div className="h-full w-[82%] bg-indigo-500 rounded-full" />

              </div>

            </div>

            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-sm text-gray-400">

                  Seat Optimization

                </span>

                <span className="text-sm font-semibold text-white">

                  67%

                </span>

              </div>

              <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                <div className="h-full w-[67%] bg-emerald-500 rounded-full" />

              </div>

            </div>

            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-sm text-gray-400">

                  Pricing Efficiency

                </span>

                <span className="text-sm font-semibold text-white">

                  74%

                </span>

              </div>

              <div className="h-2 rounded-full bg-white/10 overflow-hidden">

                <div className="h-full w-[74%] bg-amber-400 rounded-full" />

              </div>

            </div>

          </div>

        </div>

        {/* right */}
        <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

          <h4 className="text-xl font-bold mb-5">

            AI Stack Health Summary

          </h4>

          <div className="space-y-4 text-sm text-gray-300 leading-7">

            <p>

              Your organization shows strong AI adoption,
              but several optimization opportunities remain across overlapping tooling,
              pricing plans,
              and underutilized subscriptions.

            </p>

            <p>

              The largest savings opportunities currently come from reducing duplicated AI assistants,
              optimizing enterprise subscriptions,
              and improving team seat allocation efficiency.

            </p>

            <p>

              Based on current benchmarks,
              your stack performs above average in productivity enablement,
              but below optimal levels in cost efficiency.

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}