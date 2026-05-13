const TOOLS_CONFIG = [
  {
    id: 1,
    name: "Cursor",
    plans: ["Pro", "Teams"],
    basePrice: { Pro: 20, Teams: 40 },
  },
  {
    id: 2,
    name: "GitHub Copilot",
    plans: ["Individual", "Business"],
    basePrice: { Individual: 10, Business: 19 },
  },
];

interface Props {
  selectedTool: string;
  onToolChange: (
    toolName: string,
    plan: string,
    price: number
  ) => void;
}

//selector
export default function ToolSelector({
  selectedTool,
  onToolChange,
}: Props) {

  return (
    <div>

      <label className="text-[11px] text-slate-500 block mb-1.5">
        Tool
      </label>

      <select
        value={selectedTool}

        onChange={(e) => {
          const s = TOOLS_CONFIG.find(
            (t) => t.name === e.target.value
          );

          if (!s) return;

          const dp = s.plans?.[0];
          const pr = (s.basePrice as any)[dp] || 0;

          onToolChange(s.name, dp, pr);
        }}

        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
      >

        {TOOLS_CONFIG.map((t) => (
          <option key={t.id} value={t.name}>
            {t.name}
          </option>
        ))}

      </select>

    </div>
  );
}