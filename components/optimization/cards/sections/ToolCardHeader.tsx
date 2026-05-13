import { Cpu } from "lucide-react";

interface Props {
  toolName: string;
  totalCost: number;
}

//header
export default function ToolCardHeader({ toolName, totalCost }: Props) {

  return (
    <div className="flex items-start justify-between gap-3">

      {/* left */}
      <div className="flex items-center gap-3 min-w-0">

        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <Cpu className="text-indigo-300" size={18} />
        </div>

        <div className="min-w-0">

          {/* IMPORTANT: toolName must be used */}
          <h3 className="text-lg font-black text-white truncate">
            {toolName}
          </h3>

          <p className="text-slate-500 text-xs">
            AI Workspace
          </p>

        </div>
      </div>

      {/* right */}
      <div className="text-right shrink-0">

        <p className="text-slate-500 text-[11px]">Monthly</p>

        <div className="text-xl font-black text-emerald-400 mt-1">
          ${Math.round(totalCost).toLocaleString()}
        </div>

      </div>

    </div>
  );
}