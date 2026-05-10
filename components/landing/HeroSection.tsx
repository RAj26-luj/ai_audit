"use client";

// hero content

import {
  motion,
} from "framer-motion";

import {
  ArrowRight,
  Sparkles,
  BarChart3,
} from "lucide-react";

type StepType =
  | "landing"
  | "inputs"
  | "loading"
  | "results";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<StepType>
  >;

  rotateX: any;
  rotateY: any;
};

export default function HeroSection({
  setStep,
  rotateX,
  rotateY,
}: Props) {

  const handleStartAudit = () => {

    localStorage.setItem(
      "selectedFeature",
      "audit"
    );

    setStep("inputs");
  };

  const handleViewDemo = () => {

    window.location.href = "/audit/demo";
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
      }}

      className="relative z-10 flex flex-col items-center text-center max-w-5xl"
    >

      {/* badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 mb-10">

        <Sparkles size={14} />

        Next Generation Audit System
      </div>

      {/* title */}
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">

        Audit Your AI Stack

        <br />

        Recover Your Burn.
      </h1>

      {/* subtitle */}
      <p className="text-xl text-gray-400 mt-8 max-w-2xl leading-relaxed">

        Most startups waste 30% of their AI budget on unused seats,
        overlapping subscriptions, and inefficient pricing plans.
      </p>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-5 mt-12">

        {/* main cta */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={handleStartAudit}

          className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center gap-3 shadow-2xl shadow-white/10"
        >

          Start Free Audit

          <ArrowRight size={24} />
        </motion.button>

        {/* demo button */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}

          whileTap={{
            scale: 0.97,
          }}

          onClick={handleViewDemo}

          className="px-8 py-5 rounded-2xl border border-white/10 bg-white/[0.03] text-white font-semibold text-lg flex items-center gap-3 hover:bg-white/[0.05] transition-all"
        >

          <BarChart3 size={20} />

          View Demo Report
        </motion.button>

      </div>

      {/* trust text */}
      <p className="text-sm text-gray-500 mt-6">

        No signup required • Instant audit • Shareable results
      </p>

    </motion.div>
  );
}