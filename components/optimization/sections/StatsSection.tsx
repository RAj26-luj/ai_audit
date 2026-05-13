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

//stats
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
      title: "Current",
      value: `$${Math.round(currentSpend || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-slate-200",
      bg: "bg-slate-900/70 border-slate-800",
    },
    {
      title: "Optimized",
      value: `$${Math.round(optimizedSpend || 0).toLocaleString()}`,
      icon: TrendingDown,
      color: "text-indigo-300",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Savings",
      value: `${savings >= 0 ? "+" : "-"}$${Math.round(Math.abs(savings || 0)).toLocaleString()}`,
      icon: Sparkles,
      color: savings >= 0 ? "text-emerald-300" : "text-red-300",
      bg: savings >= 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20",
    },
    {
      title: "Risk",
      value: productivityRisk,
      icon: productivityRisk === "High" ? AlertTriangle : ShieldCheck,
      color: riskColor,
      bg: riskBg,
    },
  ];

  return (
    <section>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">

        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              className={`rounded-xl border p-3 ${card.bg}`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[11px] text-slate-400">
                    {card.title}
                  </p>

                  <h3 className={`text-xl font-black ${card.color}`}>
                    {card.value}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center">
                  <Icon size={16} className={card.color} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}