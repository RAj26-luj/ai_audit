"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

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

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleStartAudit = () => {

    localStorage.setItem(
      "selectedFeature",
      "audit"
    );

    setStep("inputs");

    setMenuOpen(false);

    const section =
      document.getElementById(
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

        <Logo
          setStep={setStep}
        />

        {/* DESKTOP */}

        <div className="hidden md:flex items-center gap-10">

          <NavLinks />

          <button
            onClick={
              handleStartAudit
            }
            className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform"
          >

            Start Audit

          </button>

          <CredexButton />

        </div>

        {/* MOBILE BUTTON */}

        <div className="md:hidden">

          <MobileMenuButton
            open={menuOpen}
            toggle={() =>
              setMenuOpen(
                !menuOpen
              )
            }
          />

        </div>

      </div>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -10,
            }}

            className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl"
          >

            <div className="px-4 py-5 flex flex-col gap-5">

              <NavLinks />

              <button
                onClick={
                  handleStartAudit
                }
                className="w-full px-5 py-3 rounded-xl bg-white text-black font-semibold"
              >

                Start Audit

              </button>

              <CredexButton />

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* bottom line */}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

    </motion.nav>
  );
}