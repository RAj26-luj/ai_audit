"use client";

import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import StackSection from "./sections/StackSection";
import RecommendationsSection from "./sections/RecommendationsSection";
import ExportSection from "./sections/ExportSection";

import PDFReport from "./pdf/PDFReport";
import OptimizationToolbar from "./components/OptimizationToolbar";
import OptimizedEmptyState from "./components/OptimizedEmptyState";

import { exportPDF } from "./utils/exportPDF";
import { MOCK_AUDIT } from "./data/mockAudit";
import type { AuditResult } from "./types";
import { useOptimizer } from "./hooks/useOptimizer";

export default function InteractiveOptimizer({
  audit = MOCK_AUDIT,
}: {
  audit?: AuditResult;
}) {

  const {
    currentTools,
    optimizedStack,
    recommendations,
    enabled,
    optimizedSpend,
    monthlySavings,
    productivityRisk,
    loading,
    originalSpend,
    handleStackChange,
    handleToggle,
    resetToRecommended,
  } = useOptimizer(audit);

  return (
    <div id="optimization-report" className="min-h-screen bg-slate-950 text-white px-4 py-5">

      <div className="max-w-[1600px] mx-auto space-y-5">

        {/* hero */}
        <HeroSection
          monthlySavings={monthlySavings}
          yearlySavings={monthlySavings * 12}
        />

        {/* stats + toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          <StatsSection
            currentSpend={originalSpend}
            optimizedSpend={optimizedSpend}
            savings={monthlySavings}
            productivityRisk={productivityRisk}
          />

          <OptimizationToolbar loading={loading} onReset={resetToRecommended} />

        </div>

        {/* main grid */}
        <div className="grid grid-cols-12 gap-5">

          <div className="col-span-12 xl:col-span-5">
            <StackSection
              tools={currentTools}
              recommendedTools={optimizedStack}
              onStackChange={handleStackChange}
            />
          </div>

          <div className="col-span-12 xl:col-span-7">

            {recommendations.length ? (
              <RecommendationsSection
                recommendations={recommendations}
                enabled={enabled}
                toggle={handleToggle}
                updateSeatReduction={() => {}}
                updatePlan={() => {}}
              />
            ) : (
              <OptimizedEmptyState />
            )}

          </div>

        </div>

        {/* pdf */}
        <PDFReport
          currentSpend={originalSpend}
          optimizedSpend={optimizedSpend}
          monthlySavings={monthlySavings}
          yearlySavings={monthlySavings * 12}
          productivityRisk={productivityRisk}
          recommendations={recommendations}
          optimizedStack={optimizedStack}
        />

        {/* export */}
        <ExportSection onExport={exportPDF} />

      </div>
    </div>
  );
}