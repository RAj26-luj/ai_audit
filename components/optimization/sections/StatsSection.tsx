"use client";

import {
  DollarSign,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

interface Props {

  currentSpend: number;

  optimizedSpend: number;

  savings: number;

  productivityRisk: string;
}

export default function StatsSection({
  currentSpend,
  optimizedSpend,
  savings,
  productivityRisk,
}: Props) {

  const riskColor =
    productivityRisk === "High"
      ? "text-red-300"
      : productivityRisk === "Medium"
      ? "text-amber-300"
      : "text-emerald-300";

  const riskBg =
    productivityRisk === "High"
      ? "bg-red-500/10 border-red-500/20"
      : productivityRisk === "Medium"
      ? "bg-amber-500/10 border-amber-500/20"
      : "bg-emerald-500/10 border-emerald-500/20";

  const cards = [

    {
      title:
        "Current Spend",

      value:
        `$${Math.round(
          currentSpend || 0
        ).toLocaleString()}`,

      icon:
        DollarSign,

      color:
        "text-slate-200",

      bg:
        "bg-slate-900/70 border-slate-800",
    },

    {
      title:
        "Optimized Spend",

      value:
        `$${Math.round(
          optimizedSpend || 0
        ).toLocaleString()}`,

      icon:
        TrendingDown,

      color:
        "text-indigo-300",

      bg:
        "bg-indigo-500/10 border-indigo-500/20",
    },

    {
      title:
        "Monthly Savings",

      value:
        `${savings >= 0 ? "+" : "-"}$${Math.round(
          Math.abs(
            savings || 0
          )
        ).toLocaleString()}`,

      icon:
        Sparkles,

      color:
        savings >= 0
          ? "text-emerald-300"
          : "text-red-300",

      bg:
        savings >= 0
          ? "bg-emerald-500/10 border-emerald-500/20"
          : "bg-red-500/10 border-red-500/20",
    },

    {
      title:
        "Productivity Risk",

      value:
        productivityRisk,

      icon:
        productivityRisk === "High"
          ? AlertTriangle
          : ShieldCheck,

      color:
        riskColor,

      bg:
        riskBg,
    },
  ];

  return (

    <section>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">

        {cards.map(
          (
            card,
            index
          ) => {

            const Icon =
              card.icon;

            return (

              <div
                key={index}
                className={`rounded-2xl border p-4 ${card.bg}`}
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-slate-400 mb-2">

                      {card.title}

                    </p>

                    <h3 className={`text-2xl font-black ${card.color}`}>

                      {card.value}

                    </h3>

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">

                    <Icon
                      size={18}
                      className={card.color}
                    />

                  </div>

                </div>

              </div>

            );
          }
        )}

      </div>

    </section>
  );
}