//details screen
import {
  motion,
} from "framer-motion";

import {
  useState,
} from "react";

import SectionHeader from "../section-header/SectionHeader";

import ToolDetailsCard from "../tool-details/ToolDetailsCard";

import AuditButton from "./AuditButton";
import BackButton from "./BackButton";

import DetailsFormSection from "./details/DetailsFormSection";
import ValidationError from "./details/ValidationError";

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

  setFormData: React.Dispatch<
    React.SetStateAction<FormDataType>
  >;

  startAudit: () => void;
  goBack: () => void;
};

//details step
export default function DetailsStep({
  formData,
  selectedToolsData,
  updateDetail,
  setFormData,
  startAudit,
  goBack,
}: Props) {

  const [error, setError] =
    useState("");

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
              formData.toolDetails[tool.id]
            }

            updateDetail={updateDetail}
          />

        ))}

        <DetailsFormSection
          formData={formData}
          setFormData={setFormData}
        />

        <ValidationError error={error} />

      </div>

      <AuditButton
        startAudit={() => {

          const invalid =
            Object.values(formData.toolDetails)
              .some((detail: any) => {

                return (
                  !detail.monthlySpend ||
                  detail.monthlySpend <= 0 ||

                  Number.isNaN(detail.monthlySpend) ||

                  !detail.seats ||
                  detail.seats <= 0 ||

                  Number.isNaN(detail.seats) ||

                  !detail.plan
                );
              });

          //validation fail
          if (
            invalid ||
            !formData.teamSize ||
            formData.teamSize <= 0
          ) {

            setError(
              "Please enter valid monthly spend and team size before running the AI audit."
            );

            return;
          }

          setError("");
          startAudit();
        }}
      />

    </motion.div>
  );
}