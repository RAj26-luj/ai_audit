import ShareButton from "../ShareButton";
import ExportPDFButton from "../ExportPDFButton";

interface Props {
  monthlySavings: number;
}

//hero
export default function HeroSection({
  monthlySavings,
}: Props) {

  return (

    <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-8 md:p-12">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* left */}
        <div>

          <p className="text-indigo-400 font-semibold uppercase tracking-[0.2em] text-sm">
            Estimated Savings Opportunity
          </p>

          <h2 className="mt-4 text-5xl md:text-7xl font-black tracking-tight">

            ${Math.round(monthlySavings || 0).toLocaleString()}

            <span className="text-2xl md:text-3xl text-gray-400 font-semibold">
              /month
            </span>

          </h2>

          <p className="mt-4 text-lg text-gray-400 max-w-2xl leading-relaxed">
            Our AI optimization engine analyzed your software stack, identified redundant subscriptions, pricing inefficiencies, and underutilized seats, then generated actionable savings recommendations.
          </p>

        </div>

        {/* actions */}
        <div className="flex flex-col gap-4">
          <ShareButton />
          <ExportPDFButton />
        </div>

      </div>

    </div>
  );
}