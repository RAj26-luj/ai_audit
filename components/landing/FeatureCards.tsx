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

export default function FeatureCards() {

  return (
    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10">

      {cards.map((item, idx) => (

        <motion.div
          key={idx}

          whileHover={{
            y: -10,
          }}

          className="p-8 rounded-3xl bg-white/[0.03] border border-white/5"
        >

          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 mb-6">

            {item.icon}
          </div>

          <h3 className="text-xl font-bold text-white mb-3">

            {item.title}
          </h3>

          <p className="text-gray-500">

            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}