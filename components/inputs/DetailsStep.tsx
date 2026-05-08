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

  setFormData: React.Dispatch<
    React.SetStateAction<FormDataType>
  >;

  startAudit: () => void;

  goBack: () => void;
};

export default function DetailsStep({
  formData,
  selectedToolsData,
  updateDetail,
  setFormData,
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

        <div className="grid md:grid-cols-2 gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

          <div>
            <label className="text-sm text-zinc-400 block mb-2">
              Team Size
            </label>

            <input
              type="number"
              min={1}
              value={
                formData.teamSize || 1
              }
              onChange={(e) =>
                setFormData(
                  (prev) => ({
                    ...prev,
                    teamSize:
                      Number(
                        e.target.value
                      ),
                  })
                )
              }
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 block mb-2">
              Primary Use Case
            </label>

            <select
              value={
                formData.useCase || "coding"
              }
              onChange={(e) =>
                setFormData(
                  (prev) => ({
                    ...prev,
                    useCase:
                      e.target.value as any,
                  })
                )
              }
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
            >
              <option value="coding">
                Coding
              </option>

              <option value="writing">
                Writing
              </option>

              <option value="research">
                Research
              </option>

              <option value="data">
                Data
              </option>

              <option value="mixed">
                Mixed
              </option>
            </select>
          </div>
        </div>
      </div>

      <AuditButton
        startAudit={startAudit}
      />
    </motion.div>
  );
}