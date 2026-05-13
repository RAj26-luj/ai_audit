//footer hint
import { motion } from "framer-motion";

import {
  MousePointer2,
} from "lucide-react";

//cursor hint
export default function FooterHint() {

  return (
    <motion.div
      className="mt-20 flex flex-col items-center gap-4 text-gray-600"
    >

      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em]">
        <MousePointer2 size={12} />
        Move cursor to explore
      </div>

      <div className="w-px h-12 bg-gradient-to-b from-indigo-500/50 to-transparent" />

    </motion.div>
  );
}