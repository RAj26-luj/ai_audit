import { Tool } from "../types";

interface Props {
  tools: Tool[];
}

export default function StackBreakdownSection({
  tools,
}: Props) {

  return (

    <section className="rounded-[2rem] border border-slate-800 bg-slate-900/40 p-10">

      <h2 className="text-3xl font-black mb-8">

        Stack Breakdown

      </h2>

      <div className="space-y-4">

        {tools.map(
          (tool) => {

            const cost =
              tool.seats *
              tool.pricePerSeat;

            return (

              <div
                key={tool.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 flex items-center justify-between"
              >

                <div>

                  <h3 className="text-xl font-bold">

                    {tool.name}

                  </h3>

                  <p className="text-slate-400 mt-1">

                    {tool.plan}
                    {" • "}
                    {tool.seats} seats

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-3xl font-black text-white">

                    $
                    {cost.toLocaleString()}

                  </p>

                  <p className="text-sm text-slate-500">

                    monthly

                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>

    </section>
  );
}