// hero content

import {
  motion,
} from "framer-motion";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

type StepType =
  | "landing"
  | "inputs"
  | "loading"
  | "results";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<StepType>
  >;

  rotateX: any;
  rotateY: any;
};

export default function HeroSection({
  setStep,
  rotateX,
  rotateY,
}: Props) {

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
      }}

      className="relative z-10 flex flex-col items-center text-center max-w-5xl"
    >

      {/* badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-indigo-400 mb-10">

        <Sparkles size={14} />

        Next Generation Audit System
      </div>

      {/* title */}
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">

        Audit Your AI Stack

        <br />

        Recover Your Burn.
      </h1>

      {/* subtitle */}
      <p className="text-xl text-gray-400 mt-8 max-w-2xl">

        Most startups waste 30% of their AI budget on unused seats and inefficient pricing.
      </p>

      {/* button */}
      <motion.button
        whileHover={{
          scale: 1.05,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={() =>
          setStep("inputs")
        }

        className="mt-12 px-10 py-5 bg-white text-black rounded-2xl font-black text-xl flex items-center gap-3"
      >

        Start Free Audit

        <ArrowRight size={24} />
      </motion.button>
    </motion.div>
  );
}