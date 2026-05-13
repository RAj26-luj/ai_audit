//tool selection logic
import { TOOLS_CONFIG } from "@/data/tools";

import type {
  ToolDetail,
  FormDataType,
} from "@/types/audit";

export function useToolSelection(
  formData: FormDataType,

  setFormData: React.Dispatch<
    React.SetStateAction<FormDataType>
  >
) {

  //toggle tool
  const toggleTool = (
    toolId: string
  ) => {

    const exists =
      formData.selectedTools.includes(toolId);

    setFormData((prev) => {

      const updatedTools = exists
        ? prev.selectedTools.filter(
            (t) => t !== toolId
          )
        : [...prev.selectedTools, toolId];

      const updatedDetails = {
        ...prev.toolDetails,
      };

      //add defaults
      if (!exists) {

        updatedDetails[toolId] = {
          plan: "Pro",
          seats: 1,
          monthlySpend: 20,
        };

      } else {

        //remove tool
        delete updatedDetails[toolId];
      }

      return {
        ...prev,
        selectedTools: updatedTools,
        toolDetails: updatedDetails,
      };
    });
  };

  //update details
  const updateDetail = (
    toolId: string,
    field: keyof ToolDetail,
    value: string | number
  ) => {

    setFormData((prev) => ({
      ...prev,

      toolDetails: {
        ...prev.toolDetails,

        [toolId]: {
          ...prev.toolDetails[toolId],
          [field]: value,
        },
      },
    }));
  };

  //selected tools
  const selectedToolsData =
    TOOLS_CONFIG.filter((tool) =>
      formData.selectedTools.includes(tool.id)
    );

  return {
    toggleTool,
    updateDetail,
    selectedToolsData,
  };
}