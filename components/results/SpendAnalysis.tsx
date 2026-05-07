// spend analysis cards

type Props = {
  monthly: number;

  yearly: number;
};

export default function SpendAnalysis({
  monthly,
  yearly,
}: Props) {

  return (
    <section className="bg-white/5 rounded-3xl border border-white/10">

      <div className="p-6 border-b border-white/10">

        <h3 className="text-2xl font-bold">

          Spend Analysis
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

        <div className="rounded-2xl bg-black/30 border border-white/5 p-6">

          <p className="text-sm text-gray-500 mb-2">

            Total Monthly Spend
          </p>

          <h3 className="text-4xl font-black">

            $
            {Math.round(
              monthly || 0
            ).toLocaleString()}
          </h3>
        </div>

        <div className="rounded-2xl bg-black/30 border border-white/5 p-6">

          <p className="text-sm text-gray-500 mb-2">

            Total Yearly Spend
          </p>

          <h3 className="text-4xl font-black">

            $
            {Math.round(
              yearly || 0
            ).toLocaleString()}
          </h3>
        </div>
      </div>
    </section>
  );
}