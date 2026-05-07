// reusable stat card

import { motion } from "framer-motion";

type Props = {
  label: string;

  value: number;

  subtext: string;

  icon: React.ElementType;

  primary?: boolean;
};

export default function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  primary = false,
}: Props) {

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}

      className={`p-6 rounded-3xl border ${
        primary
          ? "bg-indigo-600 border-indigo-500 text-white"
          : "bg-white/5 border-white/10 text-white"
      }`}
    >

      <div className="flex justify-between items-start mb-4">

        <div
          className={`p-2 rounded-xl ${
            primary
              ? "bg-white/20"
              : "bg-white/5 text-indigo-400"
          }`}
        >

          <Icon size={22} />
        </div>
      </div>

      <p className="text-sm text-gray-300">

        {label}
      </p>

      <h3 className="text-3xl font-black mt-2">

        $
        {Math.round(
          value || 0
        ).toLocaleString()}
      </h3>

      <p className="text-sm text-gray-400 mt-2">

        {subtext}
      </p>
    </motion.div>
  );
}