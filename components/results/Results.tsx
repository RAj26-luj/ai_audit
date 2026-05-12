"use client";

// main results page

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
  data: any;
};

export default function Results({
  data,
}: Props) {

  if (!data) {

    return <EmptyState />;
  }

  const spendPerEmployee =
    Math.round(
      (
        data.originalSpend || 0
      ) /
      Math.max(
        data.teamSize || 1,
        1
      )
    );

  return (

    <div className="min-h-screen bg-[#020205] py-12 px-4 text-white">

      <div
        id="audit-report"
        className="max-w-7xl mx-auto"
      >

        {/* PRINTABLE */}

        <div className="hidden">

          <div id="print-report">

            <PrintableReport
              data={data}
            />

          </div>

        </div>

        {/* HEADER */}

        <ResultsHeader />

        {/* HERO */}

        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-8 md:p-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <p className="text-indigo-400 font-semibold uppercase tracking-[0.2em] text-sm">

                Estimated Savings Opportunity

              </p>

              <h2 className="mt-4 text-5xl md:text-7xl font-black tracking-tight">

                $

                {Math.round(
                  data.monthlySavings || 0
                ).toLocaleString()}

                <span className="text-2xl md:text-3xl text-gray-400 font-semibold">

                  /month

                </span>

              </h2>

              <p className="mt-4 text-lg text-gray-400 max-w-2xl leading-relaxed">

                Our AI optimization engine analyzed your software stack,
                identified redundant subscriptions,
                pricing inefficiencies,
                and underutilized seats,
                then generated actionable savings recommendations.

              </p>

            </div>

            <div className="flex flex-col gap-4">

              <ShareButton />

              <ExportPDFButton />

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="mt-8">

          <StatsGrid
            data={{
              ...data,

              totalMonthlySpend:
                data.originalSpend || 0,

              totalYearlySpend:
                (
                  data.originalSpend || 0
                ) * 12,

              estimatedWasteMonthly:
                data.monthlySavings || 0,

              estimatedWasteYearly:
                data.yearlySavings || 0,

              totalPotentialSavings:
                data.yearlySavings || 0,

              spendPerEmployee,

              potentialSavingsPercentage:
                data.savingsPercentage || 0,

              optimizationScore:
                data.optimizationScore || 0,
            }}
          />

        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 print:block mt-8">

          {/* LEFT */}

          <div className="xl:col-span-8 space-y-8 print:space-y-6">

            <ExecutiveSummary
              summary={
                data.summary?.trim()
                  ? data.summary
                  : `
## AI Spend Analysis

Your AI stack was analyzed for optimization opportunities.

The system reviewed:
- subscription overlap
- pricing inefficiencies
- unused seats
- tooling redundancy

Potential savings and optimization insights are shown below.
                    `
              }

              savings={
                data.monthlySavings || 0
              }
            />

            <SpendAnalysis
              monthly={
                data.originalSpend || 0
              }

              yearly={
                (
                  data.originalSpend || 0
                ) * 12
              }

              spendPerEmployee={
                spendPerEmployee
              }

              benchmarkMessage={
                data.savingsPercentage > 0
                  ? `Your stack has a ${data.savingsPercentage}% optimization opportunity compared to similar AI-first teams.`
                  : "Your current AI stack already appears highly optimized."
              }
            />

            <BenchmarkInsights
              spendPerEmployee={
                spendPerEmployee
              }

              optimizationScore={
                data.optimizationScore || 0
              }

              wastePercentage={
                data.savingsPercentage || 0
              }
            />

          </div>

          {/* RIGHT */}

          <div className="xl:col-span-4 space-y-8 print:mt-6 print:space-y-6">

            {
              data.recommendations?.length > 0 ? (

                <Recommendations
                  recommendations={
                    data.recommendations || []
                  }

                  auditId={
                    data.id || "demo"
                  }
                />

              ) : (

                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8">

                  <h3 className="text-2xl font-bold text-emerald-300">

                    Stack Already Optimized

                  </h3>

                  <p className="mt-3 text-gray-300 leading-7">

                    Our optimization engine did not detect any major pricing inefficiencies,
                    subscription overlap,
                    or unused seat allocations in your current AI stack.

                  </p>

                </div>
              )
            }

            <OptimizationCTA
              savings={
                data.savingsPercentage || 0
              }

              recommendations={
                data.recommendations || []
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