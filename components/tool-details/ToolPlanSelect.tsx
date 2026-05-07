// tool plan selector

import {
  Layers,
} from "lucide-react";

import FieldLabel from "./FieldLabel";

type Props = any;

export default function ToolPlanSelect({
  tool,
  details,
  updateDetail,
}: Props) {

  return (
    <div className="space-y-2">

      <FieldLabel
        icon={<Layers size={14} />}
        text="Plan"
      />

      <select
        value={details.plan}

        onChange={(e) =>
          updateDetail(
            tool.id,
            "plan",
            e.target.value
          )
        }

        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
      >

        {tool.plans.map(
          (plan: string) => (

            <option
              key={plan}
              value={plan}
            >

              {plan}
            </option>
          )
        )}
      </select>
    </div>
  );
}