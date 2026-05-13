"use client";

import EditableToolCard from "../cards/EditableToolCard";

interface Tool {
  id: string;
  name: string;
  plan: string;
  pricePerSeat: number;
  seats: number;
  category?: string;
}

interface Props {
  tools: Tool[];
  recommendedTools: Tool[];
  onStackChange: (tools: Tool[]) => void;
}

//stack section
export default function StackSection({
  tools,
  recommendedTools,
  onStackChange,
}: Props) {

  const updateTool = (id: string, updates: Partial<Tool>) => {
    const updated = tools.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );

    onStackChange(updated);
  };

  return (
    <section className="mt-2">

      {/* header */}
      <div className="mb-4">
        <h2 className="text-3xl font-black text-white">
          Your AI Stack
        </h2>

        <p className="text-slate-400 mt-1 text-sm">
          Changes are sent instantly for recalculation
        </p>
      </div>

      {/* stack */}
      <div className="grid gap-4">

        {tools.map((tool) => {
          const recommendedTool = recommendedTools.find(
            (t) => t.id === tool.id
          );

          return (
            <EditableToolCard
              key={tool.id}
              tool={tool}
              recommendedTool={recommendedTool}
              onSeatsChange={(seats) =>
                updateTool(tool.id, { seats })
              }
              onPlanChange={(plan, price) =>
                updateTool(tool.id, { plan, pricePerSeat: price })
              }
              onToolChange={(name, plan, price) =>
                updateTool(tool.id, {
                  name,
                  plan,
                  pricePerSeat: price,
                })
              }
            />
          );
        })}

      </div>

    </section>
  );
}