type Props = {
  monthly: number;
  yearly: number;
  spendPerEmployee: number;
  benchmarkMessage: string;
};

//spend analysis
export default function SpendAnalysis({
  monthly,
  yearly,
  spendPerEmployee,
  benchmarkMessage,
}: Props) {

  return (

    <section className="bg-white/5 rounded-3xl border border-white/10">

      {/* header */}
      <div className="p-6 border-b border-white/10">
        <h3 className="text-2xl font-bold">
          Spend Analysis
        </h3>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">

        {/* monthly */}
        <div className="rounded-2xl bg-black/30 border border-white/5 p-6">

          <p className="text-sm text-gray-500 mb-2">
            Current Monthly Spend
          </p>

          <h3 className="text-4xl font-black">
            ${Math.round(monthly || 0).toLocaleString()}
          </h3>

        </div>

        {/* yearly */}
        <div className="rounded-2xl bg-black/30 border border-white/5 p-6">

          <p className="text-sm text-gray-500 mb-2">
            Current Yearly Spend
          </p>

          <h3 className="text-4xl font-black">
            ${Math.round(yearly || 0).toLocaleString()}
          </h3>

        </div>

        {/* per employee */}
        <div className="rounded-2xl bg-black/30 border border-white/5 p-6">

          <p className="text-sm text-gray-500 mb-2">
            Spend Per Employee
          </p>

          <h3 className="text-4xl font-black">
            ${Math.round(spendPerEmployee || 0).toLocaleString()}
          </h3>

          <p className="text-xs text-gray-500 mt-2">
            Monthly AI spend per employee
          </p>

        </div>

        {/* benchmark */}
        <div className="rounded-2xl bg-black/30 border border-white/5 p-6">

          <p className="text-sm text-gray-500 mb-2">
            Benchmark Insight
          </p>

          <p className="text-sm leading-6 text-gray-300">
            {benchmarkMessage}
          </p>

        </div>

      </div>

    </section>
  );
}