"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import StackSection from "./sections/StackSection";
import RecommendationsSection from "./sections/RecommendationsSection";
import ExportSection from "./sections/ExportSection";
import PDFReport from "./pdf/PDFReport";

import {
  exportPDF,
} from "./utils/exportPDF";

import {
  MOCK_AUDIT,
} from "./data/mockAudit";

import type {
  AuditResult,
  Tool,
} from "./types";

export default function InteractiveOptimizer({
  audit = MOCK_AUDIT,
}: {
  audit?: AuditResult;
}) {

  // ORIGINAL USER STACK

  const initialTools =
    useMemo(() => {

      return JSON.parse(
        JSON.stringify(
          audit.tools || []
        )
      );

    }, [audit.tools]);

  // CURRENT USER STACK

  const [
    currentTools,
    setCurrentTools,
  ] = useState<Tool[]>(
    initialTools
  );

  // AI OPTIMIZED STACK

  const [
    optimizedStack,
    setOptimizedStack,
  ] = useState<any[]>(
    []
  );

  // RECOMMENDATIONS

  const [
    recommendations,
    setRecommendations,
  ] = useState<any[]>(
    []
  );

  // ENABLED IDS

  const [
    enabled,
    setEnabled,
  ] = useState<string[]>(
    []
  );

  // METRICS

  const [
    optimizedSpend,
    setOptimizedSpend,
  ] = useState(0);

  const [
    monthlySavings,
    setMonthlySavings,
  ] = useState(0);

  const [
    productivityRisk,
    setProductivityRisk,
  ] = useState("Low");

  // LOADING

  const [
    loading,
    setLoading,
  ] = useState(false);

  // ORIGINAL SPEND

  const originalSpend =
    initialTools.reduce(
      (
        acc: number,
        tool: Tool
      ) => {

        return (
          acc +
          (
            tool.pricePerSeat || 0
          ) *
          (
            tool.seats || 0
          )
        );

      },
      0
    );

  // MAIN ENGINE

  const runOptimization =
    async (
      stack: Tool[],
      enabledIds: string[]
    ) => {

      try {

        setLoading(true);

        const res =
          await fetch(
            "/api/optimize",
            {
              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    stack,
                    enabledRecommendations:
                      enabledIds,
                  }
                ),
            }
          );

        const data =
          await res.json();

        setCurrentTools(
          Array.isArray(
            stack
          )
            ? stack
            : []
        );

        setOptimizedStack(
          Array.isArray(
            data.optimizedStack
          )
            ? data.optimizedStack
            : []
        );

        setRecommendations(
          Array.isArray(
            data.recommendations
          )
            ? data.recommendations
            : []
        );

        setOptimizedSpend(
          Number(
            data.optimizedSpend
          ) || 0
        );

        setMonthlySavings(
          Number(
            data.monthlySavings
          ) || 0
        );

        setProductivityRisk(
          data.productivityRisk ||
            "Low"
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

  // INITIALIZE

  useEffect(() => {

    const initialize =
      async () => {

        try {

          const res =
            await fetch(
              "/api/optimize",
              {
                method:
                  "POST",

                headers: {

                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify(
                    {
                      stack:
                        initialTools,

                      enabledRecommendations:
                        [],
                    }
                  ),
              }
            );

          const data =
            await res.json();

          const allIds =
            Array.isArray(
              data.recommendations
            )
              ? data.recommendations.map(
                  (
                    r: any
                  ) => r.id
                )
              : [];

          setEnabled(
            allIds
          );

          await runOptimization(
            initialTools,
            allIds
          );

        } catch (err) {

          console.error(err);
        }
      };

    initialize();

  }, [initialTools]);

  // STACK UPDATE

  const handleStackChange =
    async (
      updatedTools: Tool[]
    ) => {

      await runOptimization(
        updatedTools,
        enabled
      );
    };

  // ENABLE / DISABLE

  const handleToggle =
    async (
      id: string
    ) => {

      const updated =
        enabled.includes(id)
          ? enabled.filter(
              (x) =>
                x !== id
            )
          : [
              ...enabled,
              id,
            ];

      setEnabled(
        updated
      );

      await runOptimization(
        currentTools,
        updated
      );
    };

  // RESET

  const resetToRecommended =
    async () => {

      try {

        const res =
          await fetch(
            "/api/optimize",
            {
              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    stack:
                      initialTools,

                    enabledRecommendations:
                      [],
                  }
                ),
            }
          );

        const data =
          await res.json();

        const allIds =
          Array.isArray(
            data.recommendations
          )
            ? data.recommendations.map(
                (
                  r: any
                ) => r.id
              )
            : [];

        setEnabled(
          allIds
        );

        await runOptimization(
          initialTools,
          allIds
        );

      } catch (err) {

        console.error(err);
      }
    };

  return (

    <div
      id="optimization-report"
      className="min-h-screen bg-slate-950 text-white px-4 py-5"
    >

      <div className="max-w-[1600px] mx-auto space-y-5">

        {/* HERO */}

        <HeroSection
          monthlySavings={
            monthlySavings
          }

          yearlySavings={
            monthlySavings *
            12
          }
        />

        {/* STATS */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <StatsSection
            currentSpend={
              originalSpend
            }

            optimizedSpend={
              optimizedSpend
            }

            savings={
              monthlySavings
            }

            productivityRisk={
              productivityRisk
            }
          />

          <div className="flex items-center gap-3">

            {loading && (

              <div className="text-sm text-indigo-300 animate-pulse">

                Recalculating stack...

              </div>

            )}

            <button
              onClick={
                resetToRecommended
              }
              className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-300 px-5 py-3 text-indigo-200 font-bold"
            >

              Reset To AI Recommendation

            </button>

          </div>

        </div>

        {/* MAIN */}

        <div className="grid grid-cols-12 gap-5">

          {/* STACK */}

          <div className="col-span-12 xl:col-span-5">

            <StackSection
              tools={
                currentTools
              }

              recommendedTools={
                optimizedStack
              }

              onStackChange={
                handleStackChange
              }
            />

          </div>

          {/* RECOMMENDATIONS */}

          {recommendations.length > 0 ? (

            <div className="col-span-12 xl:col-span-7">

              <RecommendationsSection
                recommendations={
                  recommendations
                }

                enabled={
                  enabled
                }

                toggle={
                  handleToggle
                }

                updateSeatReduction={() => {}}

                updatePlan={() => {}}
              />

            </div>

          ) : (

            <div className="col-span-12 xl:col-span-7 rounded-3xl border border-emerald-500/10 bg-emerald-500/[0.03] p-10 flex flex-col items-center justify-center text-center min-h-[500px]">

              {/* ICON */}

              <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />

                </svg>

              </div>

              {/* TITLE */}

              <h2 className="text-5xl font-black text-white tracking-tight">

                Stack Already Optimized

              </h2>

              {/* DESC */}

              <p className="text-slate-400 mt-6 max-w-2xl leading-8 text-lg">

                The AI optimization engine did not detect
                pricing inefficiencies,
                duplicate subscriptions,
                unnecessary seat allocation,
                or downgrade opportunities
                in your current AI stack.

              </p>

              {/* STATUS */}

              <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4 text-emerald-300 font-semibold text-lg">

                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

                Optimization Score Excellent

              </div>

              {/* SUBTEXT */}

              <p className="text-slate-500 text-sm mt-5">

                No critical optimization actions required.

              </p>

            </div>

          )}

        </div>

        {/* PDF REPORT */}

        <PDFReport
          currentSpend={
            originalSpend
          }

          optimizedSpend={
            optimizedSpend
          }

          monthlySavings={
            monthlySavings
          }

          yearlySavings={
            monthlySavings *
            12
          }

          productivityRisk={
            productivityRisk
          }

          recommendations={
            recommendations
          }

          optimizedStack={
            optimizedStack
          }
        />

        {/* EXPORT */}

        <ExportSection
          onExport={() =>
            exportPDF()
          }
        />

      </div>

    </div>
  );
}