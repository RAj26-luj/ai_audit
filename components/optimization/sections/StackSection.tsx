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

  onStackChange: (
    tools: Tool[]
  ) => void;
}

export default function StackSection({
  tools,
  recommendedTools,
  onStackChange,
}: Props) {

  const updateTool = (
    id: string,
    updates: Partial<Tool>
  ) => {

    const updated =
      tools.map((tool) => {

        if (
          tool.id === id
        ) {

          return {
            ...tool,
            ...updates,
          };
        }

        return tool;
      });

    // SEND FULL STACK
    onStackChange(updated);
  };

  return (

    <section className="mt-2">

      {/* HEADER */}

      <div className="mb-4">

        <h2 className="text-3xl font-black text-white">

          Your AI Stack

        </h2>

        <p className="text-slate-400 mt-1 text-sm leading-7">

          Every change instantly sends your full AI stack
          back to the optimization engine for recalculation.

        </p>

      </div>

      {/* STACK */}

      <div className="grid grid-cols-1 gap-4">

        {tools.map(
          (tool) => {

            const recommendedTool =
              recommendedTools.find(
                (t) =>
                  t.id ===
                  tool.id
              );

            return (

              <EditableToolCard
                key={tool.id}

                tool={tool}

                recommendedTool={
                  recommendedTool
                }

                onSeatsChange={(
                  seats
                ) => {

                  updateTool(
                    tool.id,
                    {
                      seats,
                    }
                  );
                }}

                onPlanChange={(
                  plan,
                  price
                ) => {

                  updateTool(
                    tool.id,
                    {
                      plan,
                      pricePerSeat:
                        price,
                    }
                  );
                }}

                onToolChange={(
                  toolName,
                  plan,
                  price
                ) => {

                  updateTool(
                    tool.id,
                    {
                      name:
                        toolName,

                      plan,

                      pricePerSeat:
                        price,
                    }
                  );
                }}
              />

            );
          }
        )}

      </div>

    </section>
  );
}