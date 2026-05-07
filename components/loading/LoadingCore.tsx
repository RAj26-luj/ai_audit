// animated center loader

import { motion } from "framer-motion";

import {
  FileSearch,
} from "lucide-react";

export default function LoadingCore() {

  return (
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
            delay: i,
          }}

          className="absolute inset-0 border border-indigo-500/40 rounded-full"
        />
      ))}

      {/* svg progress */}
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

      {/* center */}
      <div className="relative w-28 h-28 rounded-3xl bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden">

        <motion.div
          animate={{
            y: [0, 8, 0],
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >

          <FileSearch className="w-14 h-14 text-indigo-400" />
        </motion.div>

        {/* scanner */}
        <motion.div
          animate={{
            top: ["-10%", "110%", "-10%"],
          }}

          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}

          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
        />

        {/* particles */}
        <div className="absolute inset-0 overflow-hidden">

          {[...Array(10)].map((_, i) => (

            <motion.div
              key={i}

              animate={{
                y: [-20, 120],
                opacity: [0, 1, 0],
              }}

              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
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
  );
}