import { DollarSign } from "lucide-react";

interface Props {
  pricePerSeat: number;
}

//footer
export default function ToolCardFooter({
  pricePerSeat,
}: Props) {

  return (
    <div className="mt-4 flex items-center justify-between">

      <div>

        <p className="text-[11px] text-slate-500">
          Price Per Seat
        </p>

        <div className="text-base font-black text-white mt-0.5">
          ${Math.round(pricePerSeat || 0)}
        </div>

      </div>

      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">

        <DollarSign
          className="text-emerald-300"
          size={18}
        />

      </div>

    </div>
  );
}