// monthly spend input

import {
  CreditCard,
} from "lucide-react";

import FieldLabel from "./FieldLabel";

type Props = any;

export default function ToolSpendInput({
  tool,
  details,
  updateDetail,
}: Props) {

  return (
    <div className="space-y-2">

      <FieldLabel
        icon={<CreditCard size={14} />}
        text="Monthly Spend"
      />

      <input
        type="number"

        min="0"

        value={details.monthlySpend}

        onChange={(e) =>
          updateDetail(
            tool.id,
            "monthlySpend",
            parseInt(
              e.target.value
            )
          )
        }

        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
      />
    </div>
  );
}