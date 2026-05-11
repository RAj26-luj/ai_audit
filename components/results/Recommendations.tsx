"use client";

import { useRouter } from "next/navigation";

import {
  Zap,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

type Props = {
  recommendations: any[];

  auditId: string;
};

export default function Recommendations({
  recommendations,
  auditId,
}: Props) {

  const router =
    useRouter();

  const handleOpen =
    (
      index: number
    ) => {

      router.push(
        `/optimize/${auditId}?focus=${index}`
      );
    };

  return (

    <section className="space-y-4">

      {/* header */}

      <div className="flex items-center justify-between">

        <h3 className="text-2xl font-bold flex items-center gap-2">

          <Zap
            className="text-amber-400"
            size={22}
          />

          Optimization Opportunities

        </h3>

        <p className="text-sm text-gray-500">

          {(recommendations || []).length}
          {" "}
          recommendations detected

        </p>

      </div>

      {(recommendations || []).map(
        (
          rec,
          idx
        ) => {

          const yearly =
            (
              rec.savings || 0
            ) * 12;

          const risk =
            rec.risk ||
            "Low";

          return (

            <button
              key={idx}

              onClick={() =>
                handleOpen(idx)
              }

              className="w-full text-left bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.03] transition-all duration-300 group"
            >

              {/* top */}

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-4 flex-wrap">

                  <span
                    className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border
                    ${
                      risk ===
                      "High"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : risk ===
                          "Medium"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >

                    {risk}
                    {" "}
                    Risk

                  </span>

                  {rec.savings ? (

                    <p className="text-emerald-400 font-bold text-lg">

                      ↗ Save $
                      {Math.round(
                        rec.savings
                      ).toLocaleString()}
                      /mo

                    </p>

                  ) : null}

                </div>

                <ChevronRight
                  size={20}
                  className="text-gray-500 group-hover:text-indigo-400 transition-colors"
                />

              </div>

              {/* title */}

              <h4 className="font-black text-4xl mt-8 text-white tracking-tight leading-tight">

                {rec.title}

              </h4>

              {/* desc */}

              <p className="text-lg text-gray-400 mt-6 leading-9">

                {rec.description}

              </p>

              {/* warning */}

              {risk === "High" && (

                <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">

                  <div className="flex items-start gap-3">

                    <AlertTriangle
                      size={16}
                      className="text-amber-300 mt-0.5"
                    />

                    <p className="text-sm text-amber-100/80 leading-7">

                      This optimization may reduce productivity,
                      collaboration efficiency,
                      or AI usage limits.

                    </p>

                  </div>

                </div>
              )}

              {/* footer */}

              <div className="mt-10 pt-6 border-t border-white/5 flex items-end justify-between">

                <div>

                  <p className="text-sm uppercase tracking-wider text-gray-500">

                    Estimated Annual Savings

                  </p>

                  <p className="text-5xl font-black mt-3">

                    $
                    {Math.round(
                      yearly
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-gray-500">

                    Monthly Impact

                  </p>

                  <p className="text-4xl font-black text-emerald-400 mt-2">

                    +$
                    {Math.round(
                      rec.savings || 0
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

            </button>
          );
        }
      )}

    </section>
  );
}