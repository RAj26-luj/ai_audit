// form submit button

import { motion } from "framer-motion";

import {
  ArrowRight,
} from "lucide-react";

type Props = {
  loading: boolean;
};

export default function SubmitButton({
  loading,
}: Props) {

  return (
    <motion.button
      whileHover={{
        scale: 1.02,
      }}

      whileTap={{
        scale: 0.98,
      }}

      type="submit"

      disabled={loading}

      className="relative mt-4 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-4 text-lg font-black text-white"
    >

      <div className="flex items-center justify-center gap-3">

        {loading
          ? "Saving..."
          : "Unlock Full Insights"}

        <ArrowRight size={20} />
      </div>
    </motion.button>
  );
}