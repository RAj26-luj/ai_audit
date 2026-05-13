interface Props {
  originalSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
}

//financial overview
export default function FinancialOverview({
  originalSpend,
  optimizedSpend,
  monthlySavings,
}: Props) {

  return (

    <section className="space-y-6">

      <h2 className="text-3xl font-bold">
        Financial Overview
      </h2>

      <div className="grid grid-cols-3 gap-5">

        {/* current */}
        <div className="bg-gray-100 rounded-2xl p-6">

          <p className="text-sm text-gray-500">
            Current Monthly Spend
          </p>

          <h3 className="text-3xl font-black mt-2">
            ${Number(originalSpend || 0).toLocaleString()}
          </h3>

        </div>

        {/* optimized */}
        <div className="bg-gray-100 rounded-2xl p-6">

          <p className="text-sm text-gray-500">
            Optimized Monthly Spend
          </p>

          <h3 className="text-3xl font-black mt-2">
            ${Number(optimizedSpend || 0).toLocaleString()}
          </h3>

        </div>

        {/* savings */}
        <div className="bg-gray-100 rounded-2xl p-6">

          <p className="text-sm text-gray-500">
            Monthly Savings
          </p>

          <h3 className="text-3xl font-black mt-2">
            ${Number(monthlySavings || 0).toLocaleString()}
          </h3>

        </div>

      </div>

    </section>
  );
}