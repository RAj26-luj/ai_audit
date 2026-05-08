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

        value={details.seats || 1}

        onChange={(e) =>
          updateDetail(
            tool.id,
            "seats",
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