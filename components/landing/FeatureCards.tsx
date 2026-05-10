"use client";

// feature cards section

import { motion } from "framer-motion";
import {
  TrendingDown,
  ShieldCheck,
  Zap,
} from "lucide-react";

const cards = [
  {
    icon: <TrendingDown size={24} />,
    title: "Find Hidden Waste",
    feature: "waste",
    desc: "Deep analysis of seat usage and unnecessary subscriptions.",
  },

  {
    icon: <ShieldCheck size={24} />,
    title: "Smarter Optimization",
    feature: "optimization",
    desc: "Independent recommendations tailored for your AI stack.",
  },

  {
    icon: <Zap size={24} />,
    title: "Instant Savings",
    feature: "savings",
    desc: "Unlock discounted infrastructure credits through Credex.",
  },
];

export default function FeatureCards() {

  const handleFeatureClick = (feature: string) => {

    localStorage.setItem("selectedFeature", feature);

    const section = document.getElementById("audit-form");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10">

      {cards.map((item, idx) => (

        <motion.button
          key={idx}

          onClick={() => handleFeatureClick(item.feature)}

          whileHover={{
            y: -10,
            scale: 1.02,
          }}

          whileTap={{
            scale: 0.98,
          }}

          className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 text-left transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.05] cursor-pointer"
        >

          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 mb-6">

            {item.icon}
          </div>

          <h3 className="text-xl font-bold text-white mb-3">

            {item.title}
          </h3>

          <p className="text-gray-500 leading-relaxed">

            {item.desc}
          </p>

          <div className="mt-6 text-indigo-400 text-sm font-medium">

            Explore feature →
          </div>

        </motion.button>
      ))}
    </div>
  );
}