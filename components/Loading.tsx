"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSearch,
  ShieldCheck,
  Database,
  Search,
  Activity,
} from "lucide-react";

export default function Loading() {
  const [statusIndex, setStatusIndex] = useState(0);

  // status
  const statuses = [
    "Initializing deep scan...",
    "Analyzing AI subscriptions...",
    "Detecting unused enterprise seats...",
    "Checking pricing inefficiencies...",
    "Verifying optimization patterns...",
    "Generating financial recovery report...",
  ];

  // cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020205] px-4">

      {/* background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1,
          }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[160px]"
        />
      </div>

      {/* grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* container */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="relative rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-12 overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.12)]">

          {/* glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />

          <div className="relative flex flex-col items-center">

            {/* loader */}
            <div className="relative w-44 h-44 flex items-center justify-center">

              {/* rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: [0, 0.25, 0],
                    scale: [0.8, 1.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 border border-indigo-500/40 rounded-full"
                />
              ))}

              {/* progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="78"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="4"
                />

                <motion.circle
                  cx="88"
                  cy="88"
                  r="78"
                  fill="transparent"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="490"
                  animate={{
                    strokeDashoffset: [490, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* core */}
              <div className="relative w-28 h-28 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-2xl">

                {/* icon */}
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FileSearch className="w-14 h-14 text-indigo-400" />
                </motion.div>

                {/* scan */}
                <motion.div
                  animate={{
                    top: ["-10%", "110%", "-10%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                />

                {/* particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [-20, 120],
                        opacity: [0, 1, 0],
                        x: [0, Math.random() * 20 - 10],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "linear",
                      }}
                      className="absolute w-1 h-1 bg-indigo-300 rounded-full"
                      style={{
                        left: `${10 + i * 8}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* text */}
            <div className="mt-14 text-center">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-[0.25em] mb-5"
              >
                AI Infrastructure Audit
              </motion.div>

              <h2 className="text-4xl font-black tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                Running Deep Analysis
              </h2>

              {/* status */}
              <div className="h-10 mt-5 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusIndex}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -20,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="text-gray-400 font-medium flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4 animate-pulse text-indigo-400" />
                    {statuses[statusIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* badges */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
              }}
              className="mt-14 flex gap-10"
            >
              {[
                {
                  icon: <ShieldCheck className="w-5 h-5" />,
                  label: "Secure",
                },
                {
                  icon: <Database className="w-5 h-5" />,
                  label: "Encrypted",
                },
                {
                  icon: <Search className="w-5 h-5" />,
                  label: "Detailed",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                    {item.icon}
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}