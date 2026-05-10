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
import ShareButton from "./ShareButton";

type Props = {
  data: (AuditResult & {
    id?: string;
  }) | null;
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
        className="max-w-7xl mx-auto"
      >

        {/* hidden printable version */}
        <div className="hidden">

          <div id="print-report">

            <PrintableReport
              data={data}
            />

          </div>

        </div>

        {/* header */}
        <ResultsHeader />

        {/* hero savings section */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-8 md:p-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <p className="text-indigo-400 font-semibold uppercase tracking-[0.2em] text-sm">

                Estimated Savings Opportunity

              </p>

              <h2 className="mt-4 text-5xl md:text-7xl font-black tracking-tight">

                $
                {data.estimatedWasteMonthly}

                <span className="text-2xl md:text-3xl text-gray-400 font-semibold">

                  /month

                </span>

              </h2>

              <p className="mt-4 text-lg text-gray-400 max-w-2xl leading-relaxed">

                Based on your current AI stack configuration,
                pricing inefficiencies,
                overlapping subscriptions,
                and optimization opportunities.

              </p>

            </div>

            <div className="flex flex-col gap-4">

              <ShareButton />

              <ExportPDFButton />

            </div>

          </div>

        </div>

        {/* stat cards */}
        <div className="mt-8">

          <StatsGrid
            data={data}
          />

        </div>

        {/* content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 print:block mt-8">

          {/* LEFT COLUMN */}
          <div className="xl:col-span-8 space-y-8 print:space-y-6">

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
          <div className="xl:col-span-4 space-y-8 print:mt-6 print:space-y-6">

           <Recommendations
  recommendations={
    data.recommendations
  }

  auditId={
    data.id || "demo"
  }
/>

            <OptimizationCTA
              savings={
                data.potentialSavingsPercentage
              }

              recommendations={
                data.recommendations
              }

              auditId={
                data.id || "demo"
              }
            />

            <AuditNotice />

          </div>

        </div>

      </div>

    </div>
  );
}