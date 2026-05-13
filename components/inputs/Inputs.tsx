"use client";

//inputs wrapper
import { useState } from "react";

import SelectionStep from "./SelectionStep";
import DetailsStep from "./DetailsStep";

import FooterStatus from "./FooterStatus";

import { useToolSelection } from "./hooks/useToolSelection";

import type { FormDataType } from "@/types/audit";

type Props = {
  formData: FormDataType;

  setFormData: React.Dispatch<
    React.SetStateAction<FormDataType>
  >;

  startAudit: () => void;
};

//inputs page
export default function Inputs({
  formData,
  setFormData,
  startAudit,
}: Props) {

  //current step
  const [step, setStep] = useState<
    "selection" | "details"
  >("selection");

  //tool logic
  const {
    toggleTool,
    updateDetail,
    selectedToolsData,
  } = useToolSelection(
    formData,
    setFormData
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-white min-h-screen">

      {step === "selection" && (
        <SelectionStep
          formData={formData}
          toggleTool={toggleTool}
          goNext={() => setStep("details")}
        />
      )}

      {step === "details" && (
        <DetailsStep
          formData={formData}

          setFormData={setFormData}

          selectedToolsData={selectedToolsData}

          updateDetail={updateDetail}

          startAudit={startAudit}

          goBack={() =>
            setStep("selection")
          }
        />
      )}

      <FooterStatus />

    </div>
  );
}