import { Tool } from "../types";

interface Props {
  tools: Tool[];
}

//stack
export default function StackBreakdownSection({ tools }: Props) {

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">

      <h2 className="text-2xl font-black mb-5">
        Stack Breakdown
      </h2>

      <div className="space-y-3">

        {tools.map((tool) => {

          const cost = (tool.seats || 0) * (tool.pricePerSeat || 0);

          return (
            <div
              key={tool.id}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 flex items-center justify-between"
            >

              {/* left */}
              <div>
                <h3 className="text-lg font-bold">
                  {tool.name}
                </h3>
                <p className="text-slate-400 text-sm">
                  {tool.plan} • {tool.seats} seats
                </p>
              </div>

              {/* right */}
              <div className="text-right">
                <p className="text-2xl font-black text-white">
                  ${cost.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  monthly
                </p>
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}