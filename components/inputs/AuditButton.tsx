//audit button
import { motion } from "framer-motion";

import {
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";

type Props = {
  startAudit: () => void;
};

//submit button
export default function AuditButton({
  startAudit,
}: Props) {

  return (
    <div className="mt-14 flex flex-col items-center">

      <motion.button
        onClick={startAudit}
        className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-indigo-600 text-white font-black text-xl"
      >

        <ShieldCheck />
        Run AI Audit
        <ArrowRight />

      </motion.button>

      <p className="text-gray-500 text-sm mt-6 flex items-center gap-2">
        <Zap size={14} />
        Calculating spend efficiency...
      </p>

    </div>
  );
}