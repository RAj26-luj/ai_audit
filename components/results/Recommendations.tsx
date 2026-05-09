import { Zap } from "lucide-react";

import type {
  Recommendation,
} from "@/lib/audit";

type Props = {
  recommendations: Recommendation[];
};

export default function Recommendations({
  recommendations,
}: Props) {

  return (
    <section className="space-y-4">

      <h3 className="text-2xl font-bold flex items-center gap-2">

        <Zap
          className="text-amber-400"
          size={22}
        />

        Optimization Opportunities
      </h3>

      {(recommendations || []).map(
        (rec, idx) => {

          const yearly =
            (rec.savings || 0) *
            12;

          return (
            <div
              key={idx}
              className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition"
            >

              <div className="flex items-center justify-between gap-4 flex-wrap">

                <span className="text-[10px] font-bold uppercase px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400">

                  {rec.impact} Impact
                </span>

                {rec.savings ? (
                  <div className="text-right">

                    <p className="text-sm font-semibold text-emerald-400">

                      Save $
                      {rec.savings}
                      /mo
                    </p>

                    <p className="text-xs text-gray-500">

                      ~$
                      {yearly.toLocaleString()}
                      /year
                    </p>
                  </div>
                ) : null}
              </div>

              <h4 className="font-bold text-lg mt-4">

                {rec.title}
              </h4>

              <p className="text-sm text-gray-400 mt-2 leading-6">

                {rec.description}
              </p>
            </div>
          );
        }
      )}
    </section>
  );
}