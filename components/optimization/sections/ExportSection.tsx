"use client";

import {
  Download,
  ShieldCheck,
  FileText,
} from "lucide-react";

interface Props {
  onExport: () => void;
}

export default function ExportSection({
  onExport,
}: Props) {

  return (

    <section className="mt-4">

      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/10 bg-slate-900/60 px-6 py-5 glass card-shadow">

        {/* BACKGROUND GLOW */}

        <div className="absolute right-0 top-0 h-40 w-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* LEFT */}

          <div className="flex items-start gap-4">

            <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">

              <FileText
                className="text-indigo-300"
                size={24}
              />

            </div>

            <div className="max-w-2xl">

              <h2 className="text-2xl font-black text-white leading-tight">

                Export Optimization Report

              </h2>

              <p className="text-sm text-slate-400 mt-1 leading-relaxed">

                Download a professional PDF containing savings analysis,
                recommendations, optimization settings, and productivity impact insights.

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <button
              onClick={onExport}
              className="h-12 px-5 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition-all duration-300 flex items-center gap-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/20"
            >

              <Download size={17} />

              Export PDF

            </button>

            <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5">

              <ShieldCheck
                className="text-emerald-300"
                size={18}
              />

              <div>

                <p className="text-sm font-semibold text-white">

                  Enterprise Ready

                </p>

                <p className="text-[11px] text-slate-500">

                  Executive-style export

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}