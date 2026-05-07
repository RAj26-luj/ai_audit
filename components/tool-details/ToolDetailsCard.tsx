"use client";

// main tool details card

import ToolHeader from "./ToolHeader";

import ToolPlanSelect from "./ToolPlanSelect";
import ToolSeatsInput from "./ToolSeatsInput";
import ToolSpendInput from "./ToolSpendInput";

type Props = {
  tool: {
    id: string;
    name: string;
    icon: string;
    plans: string[];
  };

  details: {
    plan: string;
    seats: number;
    monthlySpend: number;
  };

  updateDetail: (
    toolId: string,

    field:
      | "plan"
      | "seats"
      | "monthlySpend",

    value: string | number
  ) => void;
};

export default function ToolDetailsCard({
  tool,
  details,
  updateDetail,
}: Props) {

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-8">

      <ToolHeader tool={tool} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <ToolPlanSelect
          tool={tool}
          details={details}
          updateDetail={updateDetail}
        />

        <ToolSeatsInput
          tool={tool}
          details={details}
          updateDetail={updateDetail}
        />

        <ToolSpendInput
          tool={tool}
          details={details}
          updateDetail={updateDetail}
        />
      </div>
    </div>
  );
}