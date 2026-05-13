"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  auditId: string;
  optimizedPlan: {
    current: string;
    recommended: string;
    reason: string;
  };
}

//preview
export default function OptimizationPreview({
  auditId,
  optimizedPlan,
}: Props) {

  const router = useRouter();

  return (

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5"
    >

      {/* title */}
      <p className="text-sm font-semibold text-emerald-400">
        Recommended Configuration
      </p>

      {/* card */}
      <div className="mt-4 rounded-2xl border border-white/5 bg-black/20 p-5">

        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Current
          </p>
          <p className="mt-1 text-2xl font-bold text-white">
            {optimizedPlan.current}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Recommended
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {optimizedPlan.recommended}
          </p>
        </div>

        <p className="mt-5 text-sm text-gray-400 leading-6">
          {optimizedPlan.reason}
        </p>

      </div>

      {/* action */}
      <button
        onClick={() => router.push(`/optimize/${auditId}`)}
        className="mt-5 w-full rounded-2xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all px-5 py-4 text-indigo-300 font-semibold text-sm flex items-center justify-center gap-2"
      >
        Open Full Optimization Center
        <ChevronRight size={18} />
      </button>

    </motion.div>
  );
}