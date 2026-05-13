interface Props {
  summary?: string;
}

//summary
export default function ExecutiveSummary({
  summary,
}: Props) {

  return (

    <section className="space-y-4">

      <h2 className="text-3xl font-bold">
        Executive Summary
      </h2>

      <p className="text-lg leading-8 text-gray-700">
        {summary || "AI optimization engine analyzed your stack and identified savings opportunities."}
      </p>

    </section>
  );
}