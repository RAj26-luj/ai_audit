interface Props {
  savings: number;
  risk: string;
}

//savings card
export default function SavingsCard({
  savings,
  risk,
}: Props) {

  return (

    <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-5">

      {/* header */}
      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider text-gray-500">
            Estimated Savings
          </p>

          <div className="mt-2 flex items-end gap-1">

            <span className="text-5xl font-black text-white leading-none">
              ${Math.round(savings || 0).toLocaleString()}
            </span>

            <span className="text-xl text-gray-400 mb-1">
              /mo
            </span>

          </div>

        </div>

        {/* risk badge */}
        <div
          className={`px-4 py-2 rounded-2xl text-sm font-semibold border ${
            risk === "High"
              ? "bg-red-500/10 border-red-500/20 text-red-300"
              : risk === "Medium"
              ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
          }`}
        >
          {risk} Risk
        </div>

      </div>

    </div>
  );
}