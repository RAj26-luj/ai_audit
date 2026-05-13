"use client";

import PDFHeader from "./sections/PDFHeader";

import PDFMetrics from "./sections/PDFMetrics";

import PDFExecutiveSummary from "./sections/PDFExecutiveSummary";

import PDFStackTable from "./sections/PDFStackTable";

import PDFRecommendations from "./sections/PDFRecommendations";

import PDFFooter from "./sections/PDFFooter";

interface Props {
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  yearlySavings: number;
  productivityRisk: string;
  recommendations?: any[];
  optimizedStack?: any[];
}

export default function PDFReport({
  currentSpend,
  optimizedSpend,
  monthlySavings,
  yearlySavings,
  recommendations = [],
  optimizedStack = [],
}: Props) {

  const safeRecommendations =
    Array.isArray(
      recommendations
    )
      ? recommendations
      : [];

  const safeStack =
    Array.isArray(
      optimizedStack
    )
      ? optimizedStack
      : [];

  const topRecommendations =
    safeRecommendations
      .sort(
        (a, b) =>
          (b?.savings || 0) -
          (a?.savings || 0)
      )
      .slice(0, 3);

  return (

    <div
      id="pdf-report"
      style={{
        position: "absolute",
        left: "-99999px",
        top: 0,
        width: "1200px",
      }}
    >

      <div
        style={{
          padding: "50px",
          background: "white",
          color: "#0f172a",
          fontFamily:
            "Inter, Arial, sans-serif",
        }}
      >

        <PDFHeader />

        <PDFMetrics
          currentSpend={
            currentSpend
          }
          optimizedSpend={
            optimizedSpend
          }
          monthlySavings={
            monthlySavings
          }
          yearlySavings={
            yearlySavings
          }
        />

        <PDFExecutiveSummary
          yearlySavings={
            yearlySavings
          }
        />

        <PDFStackTable
          stack={safeStack}
        />

        <PDFRecommendations
          recommendations={
            topRecommendations
          }
        />

        <PDFFooter />

      </div>

    </div>
  );
}