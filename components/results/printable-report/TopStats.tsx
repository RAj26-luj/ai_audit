interface Props {
  productivityRisk: string;
  yearlySavings: number;
}

//top stats
export default function TopStats({
  productivityRisk,
  yearlySavings,
}: Props) {

  return (

    <div className="grid grid-cols-2 gap-6">

      {/* risk */}
      <div className="border rounded-2xl p-6">

        <p className="text-gray-500 text-sm">
          Productivity Risk
        </p>

        <h2 className="text-5xl font-black mt-3">
          {productivityRisk || "Low"}
        </h2>

      </div>

      {/* savings */}
      <div className="border rounded-2xl p-6">

        <p className="text-gray-500 text-sm">
          Estimated Yearly Savings
        </p>

        <h2 className="text-5xl font-black mt-3">
          ${Number(yearlySavings || 0).toLocaleString()}
        </h2>

      </div>

    </div>
  );
}