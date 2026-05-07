"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ExternalLink } from "lucide-react";

const APP_NAME = "StackAudit";
const CREDEX_URL = "https://credex.rocks";

type NavbarProps = {
  setStep: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setStep }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* logo */}
        <motion.div
          onClick={() => setStep("landing")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-lg shadow-white/10 group-hover:rotate-12 transition-transform duration-300">
              <Zap fill="currentColor" size={20} />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {APP_NAME}
            </span>

            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 -mt-1">
              AI Spend Intelligence
            </span>
          </div>
        </motion.div>

        {/* nav */}
        <div className="hidden md:flex items-center gap-10">
          {["Pricing Intelligence", "Optimization Flow"].map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ y: -1 }}
              className="group relative text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
            >
              {item}

              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}

          {/* button */}
          <motion.a
            href={CREDEX_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255,255,255,0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            className="group relative overflow-hidden rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black flex items-center gap-2 transition-all"
          >
            <span className="relative z-10">
              Explore Credex
            </span>

            <ExternalLink
              size={14}
              className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />

            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.a>
        </div>

        {/* mobile */}
        <div className="md:hidden">
          <button className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors">
            <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full" />
            <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full" />
            <div className="w-4 h-0.5 bg-white ml-2 rounded-full" />
          </button>
        </div>
      </div>

      {/* line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
    </motion.nav>
  );
}