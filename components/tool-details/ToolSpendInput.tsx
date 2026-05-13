//monthly spend input

import { CreditCard } from "lucide-react";
import FieldLabel from "./FieldLabel";

type Props = any;

//tool spend input
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
        step="1"
        value={
          details.monthlySpend === 0 || Number.isNaN(details.monthlySpend)
            ? ""
            : details.monthlySpend
        }
        onChange={(e) => {
          const v = e.target.value;

          if (v === "") {
            updateDetail(tool.id, "monthlySpend", 0);
            return;
          }

          const n = parseInt(v);

          if (n >= 0) {
            updateDetail(tool.id, "monthlySpend", n);
          }
        }}
        onKeyDown={(e) => {
          if (["-", "e", "+"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
      />

    </div>
  );
}