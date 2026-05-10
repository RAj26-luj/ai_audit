"use client";

// main navbar wrapper

import { motion } from "framer-motion";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CredexButton from "./CredexButton";
import MobileMenuButton from "./MobileMenuButton";

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

export default function Navbar({
  setStep,
}: Props) {

  const handleStartAudit = () => {

    localStorage.setItem(
      "selectedFeature",
      "audit"
    );

    setStep("inputs");

    const section = document.getElementById(
      "audit-form"
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={{
        y: -80,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.5,
      }}

      className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl"
    >

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Logo
          setStep={setStep}
        />

        <div className="hidden md:flex items-center gap-10">

          <NavLinks />

          <button
            onClick={handleStartAudit}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform"
          >

            Start Audit

          </button>

          <CredexButton />
        </div>

        <MobileMenuButton />
      </div>

      {/* bottom line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </motion.nav>
  );
}