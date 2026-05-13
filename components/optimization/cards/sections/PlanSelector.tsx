interface Props {
  currentTool: any;

  selectedPlan: string;

  onPlanChange: (
    plan: string,
    price: number
  ) => void;
}

//plan select
export default function PlanSelector({
  currentTool,
  selectedPlan,
  onPlanChange,
}: Props) {

  return (
    <div>

      <label className="text-[11px] text-slate-500 block mb-1.5">
        Plan
      </label>

      <select
        value={selectedPlan}

        onChange={(e) => {

          const plan = e.target.value;

          const price =
            currentTool?.basePrice?.[plan] || 0;

          onPlanChange(plan, price);
        }}

        className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
      >

        {currentTool?.plans?.map(
          (plan: string) => (

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
  );
}