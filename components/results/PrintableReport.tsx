import ReportHeader from "./printable-report/ReportHeader";
import TopStats from "./printable-report/TopStats";
import ExecutiveSummary from "./printable-report/ExecutiveSummary";
import FinancialOverview from "./printable-report/FinancialOverview";
import RecommendationsList from "./printable-report/RecommendationsList";
import ReportFooter from "./printable-report/ReportFooter";

type Props = {
  data: any;
};

//printable report
export default function PrintableReport({
  data,
}: Props) {

  return (

    <div className="bg-white text-black p-12 max-w-5xl mx-auto space-y-10">

      {/* header */}
      <ReportHeader />

      {/* top stats */}
      <TopStats
        productivityRisk={data.productivityRisk}
        yearlySavings={data.yearlySavings}
      />

      {/* summary */}
      <ExecutiveSummary summary={data.summary} />

      {/* financials */}
      <FinancialOverview
        originalSpend={data.originalSpend}
        optimizedSpend={data.optimizedSpend}
        monthlySavings={data.monthlySavings}
      />

      {/* recommendations */}
      <RecommendationsList recommendations={data.recommendations} />

      {/* footer */}
      <ReportFooter />

    </div>
  );
}