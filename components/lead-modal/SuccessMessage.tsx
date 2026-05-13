//success msg
import { motion } from "framer-motion";

import {
  CheckCircle2,
} from "lucide-react";

//success screen
export default function SuccessMessage() {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}

      animate={{ opacity: 1, scale: 1 }}

      className="py-10 text-center"
    >

      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">

        <CheckCircle2
          size={40}
          className="text-green-400"
        />

      </div>

      <h3 className="text-3xl font-black text-white">
        Audit Saved
      </h3>

      <p className="text-gray-500 mt-3">
        Your optimization report has been linked successfully.
      </p>

    </motion.div>
  );
}