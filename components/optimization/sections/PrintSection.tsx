import { Recommendation } from "../types";

interface Props {
  recommendations: Recommendation[];
  monthlySavings: number;
  yearlySavings: number;
}

export default function PrintSection({
  recommendations,
  monthlySavings,
  yearlySavings,
}: Props) {

  return (

    <div
      id="print-report"
      className="hidden print:block bg-white text-black p-10"
    >

      <h1 className="text-5xl font-black mb-6">
        StackAudit Optimization Report
      </h1>

      <p className="text-gray-600 mb-10">
        Generated AI infrastructure optimization report.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="border rounded-2xl p-6">

          <p className="text-gray-500">
            Monthly Savings
          </p>

          <h2 className="text-4xl font-black mt-2">

            $
            {Math.round(
              monthlySavings
            ).toLocaleString()}

          </h2>

        </div>

        <div className="border rounded-2xl p-6">

          <p className="text-gray-500">
            Yearly Savings
          </p>

          <h2 className="text-4xl font-black mt-2">

            $
            {Math.round(
              yearlySavings
            ).toLocaleString()}

          </h2>

        </div>

      </div>

      <div className="space-y-6">

        {recommendations.map(
          (rec) => (

            <div
              key={rec.id}
              className="border rounded-2xl p-6"
            >

              <div className="flex justify-between">

                <h3 className="text-2xl font-bold">
                  {rec.title}
                </h3>

                <span className="font-bold">

                  $
                  {Math.round(
                    rec.savings || 0
                  ).toLocaleString()}
                  /mo

                </span>

              </div>

              <p className="mt-4 text-gray-700">
                {rec.description}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}