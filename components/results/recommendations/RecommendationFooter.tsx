interface Props {
  yearly: number;
  monthly: number;
}

//footer
export default function RecommendationFooter({
  yearly,
  monthly,
}: Props) {

  return (

    <div className="mt-10 pt-6 border-t border-white/5 flex items-end justify-between">

      {/* yearly */}
      <div>

        <p className="text-sm uppercase tracking-wider text-gray-500">
          Estimated Annual Savings
        </p>

        <p className="text-5xl font-black mt-3">
          ${Math.round(yearly).toLocaleString()}
        </p>

      </div>

      {/* monthly */}
      <div className="text-right">

        <p className="text-sm text-gray-500">
          Monthly Impact
        </p>

        <p className="text-4xl font-black text-emerald-400 mt-2">
          +${Math.round(monthly).toLocaleString()}
        </p>

      </div>

    </div>
  );
}