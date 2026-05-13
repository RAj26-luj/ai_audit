"use client";

//navbar logo
import { motion } from "framer-motion";

import {
  Zap,
} from "lucide-react";

import {
  APP_NAME,
} from "./constants";

type StepType =
  | "landing"
  | "inputs"
  | "loading"
  | "results";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<StepType>
  >;
};

//logo
export default function Logo({
  setStep,
}: Props) {

  const handleLogoClick = () => {

    localStorage.removeItem(
      "selectedFeature"
    );

    setStep("landing");

    const hero =
      document.getElementById(
        "hero"
      );

    if (hero) {
      hero.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      onClick={handleLogoClick}

      whileHover={{ scale: 1.03 }}

      whileTap={{ scale: 0.98 }}

      className="group flex items-center gap-3 cursor-pointer"
    >

      {/* icon */}
      <div className="relative">

        <div className="absolute inset-0 bg-indigo-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
          <Zap
            fill="currentColor"
            size={20}
          />
        </div>

      </div>

      {/* text */}
      <div className="flex flex-col">

        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {APP_NAME}
        </span>

        <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 -mt-1">
          AI Spend Intelligence
        </span>

      </div>

    </motion.div>
  );
}