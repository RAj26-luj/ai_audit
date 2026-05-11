"use client";

import {
  Cpu,
  Users,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

import {
  TOOLS_CONFIG,
} from "@/data/tools";

interface Tool {

  id: string;

  name: string;

  plan: string;

  pricePerSeat: number;

  seats: number;

  category?: string;
}

interface Props {

  tool: Tool;

  recommendedTool?: Tool;

  onSeatsChange: (
    seats: number
  ) => void;

  onPlanChange: (
    plan: string,
    price: number
  ) => void;

  onToolChange: (
    toolName: string,
    plan: string,
    price: number
  ) => void;
}

export default function EditableToolCard({
  tool,
  recommendedTool,
  onSeatsChange,
  onPlanChange,
  onToolChange,
}: Props) {

  const currentTool =
    TOOLS_CONFIG.find(
      (t) =>
        t.name ===
        tool.name
    );

  const showWarning =
    recommendedTool &&
    (
      tool.seats <
        (
          recommendedTool
            ?.seats || 0
        ) ||
      tool.plan !==
        recommendedTool
          ?.plan
    );

  const totalCost =
    (
      tool.pricePerSeat || 0
    ) *
    (
      tool.seats || 0
    );

  const seatError =
    !tool.seats ||
    tool.seats <= 0;

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 glass card-shadow hover-lift hover:border-slate-700 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-3 min-w-0">

          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">

            <Cpu
              className="text-indigo-300"
              size={18}
            />

          </div>

          <div className="min-w-0">

            <h3 className="text-lg font-black text-white truncate">

              {tool.name}

            </h3>

            <p className="text-slate-500 text-xs">

              AI Workspace

            </p>

          </div>

        </div>

        <div className="text-right shrink-0">

          <p className="text-slate-500 text-[11px]">

            Monthly

          </p>

          <div className="text-xl font-black text-emerald-400 leading-none mt-1">

            $
            {Math.round(
              totalCost
            ).toLocaleString()}

          </div>

        </div>

      </div>

      {/* CONTROLS */}

      <div className="grid grid-cols-3 gap-2 mt-4">

        {/* TOOL */}

        <div>

          <label className="text-[11px] text-slate-500 block mb-1.5">

            Tool

          </label>

          <select
            value={tool.name}

            onChange={(e) => {

              const selected =
                TOOLS_CONFIG.find(
                  (t) =>
                    t.name ===
                    e.target.value
                );

              if (!selected) {
                return;
              }

              const defaultPlan =
                selected.plans?.[0];

              const defaultPrice =
                selected.basePrice?.[
                  defaultPlan
                ] || 0;

              onToolChange(
                selected.name,
                defaultPlan,
                defaultPrice
              );
            }}

            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
          >

            {TOOLS_CONFIG.map(
              (t) => (

                <option
                  key={t.id}
                  value={t.name}
                >

                  {t.name}

                </option>
              )
            )}

          </select>

        </div>

        {/* PLAN */}

        <div>

          <label className="text-[11px] text-slate-500 block mb-1.5">

            Plan

          </label>

          <select
            value={tool.plan}

            onChange={(e) => {

              const plan =
                e.target.value;

              const price =
                currentTool
                  ?.basePrice?.[
                    plan
                  ] || 0;

              onPlanChange(
                plan,
                price
              );
            }}

            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
          >

            {currentTool?.plans?.map(
              (plan) => (

                <option
                  key={plan}
                  value={plan}
                >

                  {plan}

                </option>
              )
            )}

          </select>

        </div>

        {/* SEATS */}

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

              value={
                tool.seats === 0
                  ? ""
                  : tool.seats
              }

              onChange={(e) => {

                const v =
                  e.target.value;

                onSeatsChange(
                  v === ""
                    ? 0
                    : Math.max(
                        1,
                        Number(v)
                      )
                );
              }}

              onBlur={() => {

                if (
                  !tool.seats ||
                  tool.seats <= 0
                ) {

                  onSeatsChange(1);
                }
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

              className={`w-full rounded-xl bg-slate-950 pl-8 pr-2 py-2 text-xs text-white outline-none focus:ring-2
              ${
                seatError
                  ? "border border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border border-slate-700 focus:border-indigo-500/40 focus:ring-indigo-500/10"
              }`}
            />

          </div>

          {seatError && (

            <p className="text-[11px] text-red-400 mt-1">

              Seats cannot be empty

            </p>

          )}

        </div>

      </div>

      {/* FOOTER */}

      <div className="mt-4 flex items-center justify-between">

        <div>

          <p className="text-[11px] text-slate-500">

            Price Per Seat

          </p>

          <div className="text-base font-black text-white mt-0.5">

            $
            {Math.round(
              tool.pricePerSeat || 0
            )}

          </div>

        </div>

        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">

          <DollarSign
            className="text-emerald-300"
            size={18}
          />

        </div>

      </div>

      {/* WARNING */}

      {showWarning && (

        <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2">

          <div className="flex items-start gap-2">

            <AlertTriangle
              className="text-amber-300 mt-0.5 shrink-0"
              size={14}
            />

            <div className="min-w-0">

              <p className="text-[11px] font-semibold text-amber-200">

                Productivity Warning

              </p>

              <p className="text-[11px] text-amber-100/70 mt-0.5 leading-relaxed">

                This configuration is below the AI engine recommendation
                and may reduce productivity or workflow quality.

              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}