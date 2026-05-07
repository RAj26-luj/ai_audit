// first screen for tool selection
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TOOLS_CONFIG } from "@/data/tools";

import SectionHeader from "../section-header/SectionHeader";

import ToolCard from "../tool-card/ToolCard";

import type {
  FormDataType,
} from "@/types/audit";

type Props = {
  formData: FormDataType;

  toggleTool: (
    toolId: string
  ) => void;

  goNext: () => void;
};

export default function SelectionStep({
  formData,
  toggleTool,
  goNext,
}: Props) {

  return (
    <motion.div>

      <SectionHeader
        badge="Step 1 : AI Stack"
        title="Select Your AI Workspace"
        subtitle="Choose platforms currently powering your workflow."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {TOOLS_CONFIG.map(
          (tool, index) => (

            <ToolCard
              key={tool.id}

              tool={tool}

              index={index}

              isSelected={formData.selectedTools.includes(
                tool.id
              )}

              toggleTool={toggleTool}
            />
          )
        )}
      </div>

      <div className="mt-14 flex justify-center">

        <motion.button
          disabled={
            formData.selectedTools.length === 0
          }

          onClick={goNext}

          className="flex items-center gap-3 px-12 py-5 rounded-3xl font-black text-lg bg-indigo-600"
        >

          Configure Details

          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}