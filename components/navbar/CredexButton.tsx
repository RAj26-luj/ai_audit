// credex redirect button

import { motion } from "framer-motion";

import {
  ExternalLink,
} from "lucide-react";

import {
  CREDEX_URL,
} from "./constants";

export default function CredexButton() {

  return (
    <motion.a
      href={CREDEX_URL}

      target="_blank"

      rel="noreferrer"

      whileHover={{
        scale: 1.05,
      }}

      whileTap={{
        scale: 0.96,
      }}

      className="group relative overflow-hidden rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black flex items-center gap-2"
    >

      <span className="relative z-10">

        Explore Credex
      </span>

      <ExternalLink
        size={14}

        className="relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />

      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
    </motion.a>
  );
}