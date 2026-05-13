interface Props {
  recommendations: any[];
}

//recommendations list
export default function RecommendationsList({
  recommendations,
}: Props) {

  return (

    <section className="space-y-6">

      <h2 className="text-3xl font-bold">
        Recommendations
      </h2>

      <div className="space-y-4">

        {(recommendations || []).map((rec: any, idx: number) => (

          <div
            key={idx}
            className="border rounded-2xl p-6"
          >

            {/* header row */}
            <div className="flex justify-between items-center mb-4">

              <span className="text-xs font-bold uppercase tracking-wide bg-black text-white px-3 py-2 rounded-full">
                {rec.impact || rec.severity || "Medium"} Impact
              </span>

              {rec.savings && (
                <span className="font-bold text-lg">
                  Save ${Math.round(rec.savings).toLocaleString()}/mo
                </span>
              )}

            </div>

            {/* title */}
            <h3 className="text-2xl font-bold">
              {rec.title}
            </h3>

            {/* description */}
            <p className="text-gray-600 leading-7 mt-3">
              {rec.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}