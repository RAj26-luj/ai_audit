"use client";

import React, { useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  TrendingDown,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  MousePointer2,
} from "lucide-react";

type LandingProps = {
  setStep: (step: string) => void;
};

export default function Landing({
  setStep,
}: LandingProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  // tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 150,
    damping: 20,
  });

  const mouseYSpring = useSpring(y, {
    stiffness: 150,
    damping: 20,
  });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );

  // spotlight
  const [spotlightPos, setSpotlightPos] =
    useState({
      x: 0,
      y: 0,
    });

  const [isHovering, setIsHovering] =
    useState(false);

  // mouse
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!containerRef.current) return;

    const rect =
      containerRef.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setSpotlightPos({
      x: mouseX,
      y: mouseY,
    });

    if (!isHovering) {
      setIsHovering(true);
    }
  };

  // reset
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };

  // cards
  const cards = [
    {
      icon: <TrendingDown size={24} />,
      title: "Find Hidden Waste",
      desc: "Deep analysis of seat usage and unnecessary subscriptions.",
    },

    {
      icon: <ShieldCheck size={24} />,
      title: "Smarter Optimization",
      desc: "Independent recommendations tailored for your AI stack.",
    },

    {
      icon: <Zap size={24} />,
      title: "Instant Savings",
      desc: "Unlock discounted infrastructure credits through Credex.",
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020205] px-4 py-20 selection:bg-indigo-500/30"
    >

      {/* background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* indigo */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            translateX: useTransform(
              mouseXSpring,
              [-0.5, 0.5],
              [100, -100]
            ),

            translateY: useTransform(
              mouseYSpring,
              [-0.5, 0.5],
              [100, -100]
            ),
          }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full"
        />

        {/* purple */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 80, -30, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            translateX: useTransform(
              mouseXSpring,
              [-0.5, 0.5],
              [-150, 150]
            ),

            translateY: useTransform(
              mouseYSpring,
              [-0.5, 0.5],
              [-150, 150]
            ),
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full"
        />

        {/* cyan */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full"
        />
      </div>

      {/* noise */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-700"
        style={{
          opacity: isHovering ? 0.6 : 0,

          background: `radial-gradient(
            800px circle at ${spotlightPos.x}px ${spotlightPos.y}px,
            rgba(79,70,229,0.12),
            transparent 80%
          )`,
        }}
      />

      {/* content */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full"
      >

        {/* badge */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-bold uppercase tracking-widest mb-10 backdrop-blur-md transition-all hover:bg-white/10 hover:border-indigo-500/30"
        >
          <Sparkles
            size={14}
            className="animate-pulse"
          />

          <span>
            Next Generation Audit System
          </span>

          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* hero */}
        <div
          className="relative mb-8"
          style={{
            transform: "translateZ(50px)",
          }}
        >
          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Audit Your AI Stack
            <br />
            Recover Your Burn.
          </motion.h1>

          <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full -z-10 opacity-50" />
        </div>

        {/* subtitle */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          style={{
            transform: "translateZ(30px)",
          }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
        >
          Most startups waste{" "}
          <span className="text-white font-semibold">
            30% of their AI budget
          </span>{" "}
          on unused seats and inefficient pricing.
          Recover your burn in under 60 seconds.
        </motion.p>

        {/* button */}
        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 0 40px rgba(99,102,241,0.4)",
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setStep("inputs")}
          className="group relative px-10 py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center gap-3 overflow-hidden shadow-2xl transition-all"
        >
          <span className="relative z-10">
            Start Free Audit
          </span>

          <ArrowRight
            size={24}
            className="relative z-10 group-hover:translate-x-1 transition-transform"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {cards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4 + idx * 0.1,
              }}
              whileHover={{
                y: -12,

                backgroundColor:
                  "rgba(255,255,255,0.06)",

                borderColor:
                  "rgba(99,102,241,0.3)",
              }}
              className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl text-left transition-all duration-500"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  transform: "translateZ(40px)",
                }}
                className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl"
              >
                {item.icon}
              </div>

              <h3
                style={{
                  transform: "translateZ(20px)",
                }}
                className="text-xl font-bold mb-3 text-white"
              >
                {item.title}
              </h3>

              <p
                style={{
                  transform: "translateZ(10px)",
                }}
                className="text-gray-500 leading-relaxed"
              >
                {item.desc}
              </p>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* footer */}
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
        className="mt-20 flex flex-col items-center gap-4 text-gray-600"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] group cursor-default">
          <MousePointer2
            size={12}
            className="group-hover:rotate-12 transition-transform"
          />

          <span className="group-hover:text-gray-400 transition-colors">
            Move cursor to explore
          </span>
        </div>

        <div className="w-px h-12 bg-gradient-to-b from-indigo-500/50 via-indigo-500/10 to-transparent" />
      </motion.div>
    </div>
  );
}