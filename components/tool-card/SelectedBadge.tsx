// selected check icon

import { motion } from "framer-motion";

import {
  CheckCircle2,
} from "lucide-react";

export default function SelectedBadge() {

  return (
    <motion.div
      initial={{
        scale: 0,
      }}

      animate={{
        scale: 1,
      }}

      className="absolute top-3 right-3 text-indigo-400"
    >

      <CheckCircle2
        size={20}

        fill="currentColor"

        className="text-black"
      />
    </motion.div>
  );
}