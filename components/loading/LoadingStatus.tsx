// loading text section

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Activity,
} from "lucide-react";

type Props = {
  statuses: string[];

  statusIndex: number;
};

export default function LoadingStatus({
  statuses,
  statusIndex,
}: Props) {

  return (
    <div className="mt-14 text-center">

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-[0.25em] mb-5">

        AI Infrastructure Audit
      </div>

      <h2 className="text-4xl font-black tracking-tight text-white">

        Running Deep Analysis
      </h2>

      {/* animated status */}
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

            className="text-gray-400 font-medium flex items-center gap-2"
          >

            <Activity className="w-4 h-4 animate-pulse text-indigo-400" />

            {statuses[statusIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}