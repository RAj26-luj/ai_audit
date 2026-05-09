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

  return (
    <section className="bg-white/5 rounded-3xl border border-white/10 p-6">

      <h3 className="text-2xl font-bold mb-6">

        Benchmark Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="rounded-2xl bg-black/30 border border-white/5 p-5">

          <p className="text-xs uppercase text-gray-500 mb-2">

            Spend Efficiency
          </p>

          <p className="text-3xl font-black">

            ${spendPerEmployee}
          </p>

          <p className="text-sm text-gray-400 mt-2">

            Monthly AI spend per employee
          </p>
        </div>

        <div className="rounded-2xl bg-black/30 border border-white/5 p-5">

          <p className="text-xs uppercase text-gray-500 mb-2">

            Optimization Score
          </p>

          <p className="text-3xl font-black">

            {optimizationScore}/100
          </p>

          <p className="text-sm text-gray-400 mt-2">

            Overall stack efficiency score
          </p>
        </div>

        <div className="rounded-2xl bg-black/30 border border-white/5 p-5">

          <p className="text-xs uppercase text-gray-500 mb-2">

            Estimated Waste
          </p>

          <p className="text-3xl font-black">

            {wastePercentage}%
          </p>

          <p className="text-sm text-gray-400 mt-2">

            Estimated recurring overspend
          </p>
        </div>
      </div>
    </section>
  );
}