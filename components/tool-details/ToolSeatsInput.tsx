// seats input field

import {
  Users,
} from "lucide-react";

import FieldLabel from "./FieldLabel";

type Props = any;

export default function ToolSeatsInput({
  tool,
  details,
  updateDetail,
}: Props) {

  return (
    <div className="space-y-2">

      <FieldLabel
        icon={<Users size={14} />}
        text="Seats"
      />

      <input
  type="number"
  min="1"
  step="1"
  value={
    details.seats === 0
      ? ""
      : details.seats
  }
  onChange={(e) => {

    const v =
      e.target.value;

    updateDetail(
      tool.id,
      "seats",
      v === ""
        ? 0
        : Number(v)
    );
  }}
  onKeyDown={(e) => {

    if (
      e.key === "-" ||
      e.key === "+" ||
      e.key === "e"
    ) {

      e.preventDefault();
    }
  }}
  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
/>
    </div>
  );
}