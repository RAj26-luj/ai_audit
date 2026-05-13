import { Users } from "lucide-react";

interface Props {
  seats: number;
  seatError: boolean;
  onSeatsChange: (s: number) => void;
}

//seats input
export default function SeatsInput({
  seats,
  seatError,
  onSeatsChange,
}: Props) {

  return (
    <div>

      <label className="text-[11px] text-slate-500 block mb-1.5">
        Seats
      </label>

      <div className="relative">

        <Users
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="number"
          min={1}
          value={seats === 0 ? "" : seats}

          onChange={(e) =>
            onSeatsChange(
              e.target.value === ""
                ? 0
                : Math.max(1, Number(e.target.value))
            )
          }

          onBlur={() =>
            (!seats || seats <= 0) && onSeatsChange(1)
          }

          onKeyDown={(e) =>
            ["-", "+", "e"].includes(e.key) && e.preventDefault()
          }

          className={`w-full rounded-xl bg-slate-950 pl-8 pr-2 py-2 text-xs text-white outline-none focus:ring-2 ${
            seatError
              ? "border border-red-500 focus:ring-red-500/20"
              : "border border-slate-700 focus:ring-indigo-500/40 focus:ring-indigo-500/10"
          }`}
        />

      </div>

      {seatError && (
        <p className="text-[11px] text-red-400 mt-1">
          Seats cannot be empty
        </p>
      )}

    </div>
  );
}