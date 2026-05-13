"use client";

import ResultsHeader from "./ResultsHeader";
import StatsGrid from "./StatsGrid";
import EmptyState from "./EmptyState";
import PrintableReport from "./PrintableReport";

import HeroSection from "./results-page/HeroSection";
import LeftPanel from "./results-page/LeftPanel";
import RightPanel from "./results-page/RightPanel";

type Props = {
  data: any;
};

//results page
export default function Results({
  data,
}: Props) {

  if (!data) return <EmptyState />;

  const spendPerEmployee = Math.round(
    (data.originalSpend || 0) / Math.max(data.teamSize || 1, 1)
  );

  return (

    <div className="min-h-screen bg-[#020205] py-12 px-4 text-white">

      <div id="audit-report" className="max-w-7xl mx-auto">

        {/* printable hidden report */}
        <div className="hidden">
          <div id="print-report">
            <PrintableReport data={data} />
          </div>
        </div>

        {/* header */}
        <ResultsHeader />

        {/* hero */}
        <HeroSection monthlySavings={data.monthlySavings || 0} />

        {/* stats */}
        <div className="mt-8">
          <StatsGrid
            data={{
              ...data,
              totalMonthlySpend: data.originalSpend || 0,
              totalYearlySpend: (data.originalSpend || 0) * 12,
              estimatedWasteMonthly: data.monthlySavings || 0,
              estimatedWasteYearly: data.yearlySavings || 0,
              totalPotentialSavings: data.yearlySavings || 0,
              spendPerEmployee,
              potentialSavingsPercentage: data.savingsPercentage || 0,
              optimizationScore: data.optimizationScore || 0,
            }}
          />
        </div>

        {/* panels */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 print:block mt-8">

          <LeftPanel data={data} spendPerEmployee={spendPerEmployee} />

          <RightPanel data={data} />

        </div>

      </div>

    </div>
  );
}