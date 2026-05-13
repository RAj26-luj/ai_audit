"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import CTAHeader from "./optimization-cta/CTAHeader";
import SavingsCard from "./optimization-cta/SavingsCard";
import RiskWarning from "./optimization-cta/RiskWarning";
import OptimizationPreview from "./optimization-cta/OptimizationPreview";
import ToggleButton from "./optimization-cta/ToggleButton";

type Props = {
  savings: number;
  recommendations: any[];
  auditId: string;
};

//optimization CTA
export default function OptimizationCTA({
  savings,
  recommendations,
  auditId,
}: Props) {

  const [showPlan, setShowPlan] = useState(false);

  const optimizedPlan = useMemo(() => {

    const r = recommendations?.[0];

    if (!r) {
      return {
        current: "Current AI Stack",
        recommended: "Optimized AI Stack",
        reason: "The optimization engine identified additional savings opportunities.",
      };
    }

    return {
      current: r.current || "Current Stack",
      recommended: r.recommended || "Optimized Stack",
      reason: r.description || "AI optimization recommendation generated dynamically.",
    };

  }, [recommendations]);

  const risk =
    savings > 60 ? "High" :
    savings > 35 ? "Medium" : "Low";

  return (

    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
    >

      {/* header */}
      <CTAHeader />

      {/* description */}
      <p className="mt-5 text-sm text-gray-400 leading-7">
        Dynamic optimization recalculates your entire AI stack every time you change seats, plans, or subscriptions.
      </p>

      {/* savings */}
      <SavingsCard savings={savings} risk={risk} />

      {/* warning */}
      {risk === "High" && <RiskWarning />}

      {/* preview */}
      {showPlan && (
        <OptimizationPreview
          auditId={auditId}
          optimizedPlan={optimizedPlan}
        />
      )}

      {/* toggle */}
      <ToggleButton
        showPlan={showPlan}
        toggle={() => setShowPlan(!showPlan)}
      />

    </motion.section>
  );
}