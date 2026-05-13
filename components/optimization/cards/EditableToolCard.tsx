"use client";

import { TOOLS_CONFIG } from "@/data/tools";

import ToolCardHeader from "./sections/ToolCardHeader";
import ToolSelector from "./sections/ToolSelector";
import PlanSelector from "./sections/PlanSelector";
import SeatsInput from "./sections/SeatsInput";
import ToolCardFooter from "./sections/ToolCardFooter";
import ProductivityWarning from "./sections/ProductivityWarning";

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
  onSeatsChange: (s: number) => void;
  onPlanChange: (p: string, pr: number) => void;
  onToolChange: (tn: string, p: string, pr: number) => void;
}

//card
export default function EditableToolCard({
  tool,
  recommendedTool,
  onSeatsChange,
  onPlanChange,
  onToolChange,
}: Props) {

  const currentTool = TOOLS_CONFIG.find(
    (t) => t.name === tool.name
  );

  const showWarning =
    recommendedTool &&
    (tool.seats < (recommendedTool?.seats || 0) ||
      tool.plan !== recommendedTool?.plan);

  const totalCost = (tool.pricePerSeat || 0) * (tool.seats || 0);

  const seatError = !tool.seats || tool.seats <= 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 glass card-shadow hover-lift hover:border-slate-700 hover:shadow-xl hover:shadow-black/20 transition-all duration-300">

      <ToolCardHeader toolName={tool.name} totalCost={totalCost} />

      <div className="grid grid-cols-3 gap-2 mt-4">

        <ToolSelector
          selectedTool={tool.name}
          onToolChange={onToolChange}
        />

        <PlanSelector
          currentTool={currentTool}
          selectedPlan={tool.plan}
          onPlanChange={onPlanChange}
        />

        <SeatsInput
          seats={tool.seats}
          seatError={seatError}
          onSeatsChange={onSeatsChange}
        />

      </div>

      <ToolCardFooter pricePerSeat={tool.pricePerSeat} />

      {showWarning && <ProductivityWarning />}

    </div>
  );
}