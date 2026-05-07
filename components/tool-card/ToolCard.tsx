"use client";

// main tool card

import { motion } from "framer-motion";

import ToolIcon from "./ToolIcon";
import ToolText from "./ToolText";
import SelectedBadge from "./SelectedBadge";

type Props = {
  tool: {
    id: string;
    name: string;
    icon: string;
  };

  index: number;

  isSelected: boolean;

  toggleTool: (
    toolId: string
  ) => void;
};

export default function ToolCard({
  tool,
  index,
  isSelected,
  toggleTool,
}: Props) {

  return (
    <motion.button
      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        delay: index * 0.05,
      }}

      whileHover={{
        y: -8,
      }}

      whileTap={{
        scale: 0.96,
      }}

      onClick={() =>
        toggleTool(tool.id)
      }

      className={`relative group p-1 rounded-3xl transition-all duration-500 ${
        isSelected
          ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
          : "bg-white/5 hover:bg-white/10"
      }`}
    >

      <div
        className={`relative h-full w-full rounded-[22px] p-6 flex flex-col items-center text-center gap-4 ${
          isSelected
            ? "bg-black/80"
            : "bg-[#0A0A0A]"
        }`}
      >

        <ToolIcon
          tool={tool}
        />

        <ToolText
          tool={tool}
          isSelected={isSelected}
        />

        {isSelected && (
          <SelectedBadge />
        )}
      </div>
    </motion.button>
  );
}