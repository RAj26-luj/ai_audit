"use client";

// main results page

import type {
  AuditResult,
} from "@/lib/audit";

import ResultsHeader from "./ResultsHeader";
import StatsGrid from "./StatsGrid";
import ExecutiveSummary from "./ExecutiveSummary";
import SpendAnalysis from "./SpendAnalysis";
import Recommendations from "./Recommendations";
import OptimizationCTA from "./OptimizationCTA";
import AuditNotice from "./AuditNotice";
import EmptyState from "./EmptyState";
import BenchmarkInsights from "./BenchmarkInsights";
import ExportPDFButton from "./ExportPDFButton";
import PrintableReport from "./PrintableReport";

type Props = {
  data: AuditResult | null;
};

export default function Results({
  data,
}: Props) {

  if (!data) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-[#020205] py-12 px-4 text-white">

      <div
        id="audit-report"
        className="max-w-6xl mx-auto"
      >
        <div className="hidden">

  <div id="print-report">

    <PrintableReport
      data={data}
    />

  </div>
</div>
        <ResultsHeader />

        <div className="mt-8">

          <StatsGrid
            data={data}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block mt-8">

          {/* LEFT COLUMN */}

          <div className="lg:col-span-2 space-y-8 print:space-y-6">

            <ExecutiveSummary
              summary={
                data.summary
              }

              savings={
                data.estimatedWasteMonthly
              }
            />

            <SpendAnalysis
              monthly={
                data.totalMonthlySpend
              }

              yearly={
                data.totalYearlySpend
              }

              spendPerEmployee={
                data.spendPerEmployee
              }

              benchmarkMessage={
                data.benchmarkMessage
              }
            />

            <BenchmarkInsights
              spendPerEmployee={
                data.spendPerEmployee
              }

              optimizationScore={
                data.optimizationScore
              }

              wastePercentage={
                data.potentialSavingsPercentage
              }
            />
          </div>

          {/* RIGHT COLUMN */}

          <div className="space-y-8 print:mt-6 print:space-y-6">

            <Recommendations
              recommendations={
                data.recommendations
              }
            />

            <OptimizationCTA
              savings={
                data.potentialSavingsPercentage
              }
            />

            <ExportPDFButton />

            <AuditNotice />
          </div>
        </div>
      </div>
    </div>
  );
}