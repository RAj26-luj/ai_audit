// second screen for details
import { motion } from "framer-motion";

import SectionHeader from "../section-header/SectionHeader";

import ToolDetailsCard from "../tool-details/ToolDetailsCard";

import AuditButton from "./AuditButton";
import BackButton from "./BackButton";

import type {
  FormDataType,
  ToolDetail,
} from "@/types/audit";

type Props = {
  formData: FormDataType;

  selectedToolsData: any[];

  updateDetail: (
    toolId: string,
    field: keyof ToolDetail,
    value: string | number
  ) => void;

  startAudit: () => void;

  goBack: () => void;
};

export default function DetailsStep({
  formData,
  selectedToolsData,
  updateDetail,
  startAudit,
  goBack,
}: Props) {

  return (
    <motion.div>

      <BackButton goBack={goBack} />

      <SectionHeader
        badge="Step 2 : Configuration"
        title="Configure Usage Details"
        subtitle="Enter seats, plans and current monthly spend."
      />

      <div className="space-y-6 max-w-4xl mx-auto">

        {selectedToolsData.map((tool) => (

          <ToolDetailsCard
            key={tool.id}

            tool={tool}

            details={
              formData.toolDetails[
                tool.id
              ]
            }

            updateDetail={
              updateDetail
            }
          />
        ))}
      </div>

      <AuditButton
        startAudit={startAudit}
      />
    </motion.div>
  );
}