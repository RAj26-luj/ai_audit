// recommendation list

import {
  Zap,
} from "lucide-react";

type Props = {
  recommendations: any[];
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

        Recommendations
      </h3>

      {(recommendations || []).map(
        (rec, idx) => (

          <div
            key={idx}

            className="bg-white/5 p-5 rounded-3xl border border-white/10"
          >

            <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400">

              {rec.impact}
            </span>

            <h4 className="font-bold mt-4">

              {rec.title}
            </h4>

            <p className="text-sm text-gray-500 mt-2">

              {rec.description}
            </p>
          </div>
        )
      )}
    </section>
  );
}