"use client";

// results page header

import {
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Home,
} from "lucide-react";

import { motion } from "framer-motion";

import ShareButton from "./ShareButton";

export default function ResultsHeader() {

  const handleBackHome = () => {

    window.location.href = "/";
  };

  return (
    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}

      className="sticky top-4 z-40 mb-10"
    >

      <div className="rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl p-6 shadow-2xl shadow-black/30">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          {/* left section */}
          <div className="flex flex-col gap-5">

            {/* top row */}
            <div className="flex flex-wrap items-center gap-4">

              {/* large back button */}
              <motion.button

                whileHover={{
                  scale: 1.03,
                }}

                whileTap={{
                  scale: 0.97,
                }}

                onClick={handleBackHome}

                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-black font-bold text-sm shadow-xl hover:bg-gray-100 transition-all"
              >

                <Home size={18} />

                Back To Home

              </motion.button>

              <div className="hidden md:block h-6 w-px bg-white/10" />

              {/* branding */}
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">

                <Sparkles size={15} />

                StackAudit Intelligence

              </div>

            </div>

            {/* status */}
            <div className="flex flex-wrap items-center gap-3">

              <span className="bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 border border-green-500/20">

                <CheckCircle2 size={12} />

                Audit Complete

              </span>

              <span className="text-gray-500 text-sm italic">

                Generated moments ago

              </span>

            </div>

            {/* title */}
            <div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">

                AI Stack
                <br />
                Optimization Report

              </h1>

              <p className="mt-4 text-gray-400 max-w-2xl leading-relaxed text-base md:text-lg">

                Detailed analysis of AI subscription efficiency,
                pricing overlap, optimization opportunities,
                and infrastructure savings potential.

              </p>

            </div>

          </div>

          {/* right actions */}
          <div className="flex items-center gap-3">

            <ShareButton />

          </div>

        </div>

      </div>

    </motion.div>
  );
}