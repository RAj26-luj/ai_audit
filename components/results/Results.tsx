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

      <div className="max-w-6xl mx-auto">

        <ResultsHeader />

        <StatsGrid data={data} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* left */}
          <div className="lg:col-span-2 space-y-8">

            <ExecutiveSummary
            summary={data.summary}
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
            />
          </div>

          {/* right */}
          <div className="space-y-8">

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

            <AuditNotice />
          </div>
        </div>
      </div>
    </div>
  );
}