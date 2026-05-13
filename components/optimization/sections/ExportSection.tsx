"use client";

import { Download, ShieldCheck, FileText } from "lucide-react";

interface Props {
  onExport: () => void;
}

export default function ExportSection({ onExport }: Props) {

  return (
    <section className="mt-3">

      {/* container */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/10 bg-slate-900/60 px-5 py-4">

        {/* glow */}
        <div className="absolute right-0 top-0 h-32 w-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* left */}
          <div className="flex items-start gap-3">

            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <FileText className="text-indigo-300" size={20} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Export Report
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Download PDF with full optimization insights
              </p>
            </div>

          </div>

          {/* right */}
          <div className="flex items-center gap-3">

            <button
              onClick={onExport}
              className="h-11 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-sm font-bold text-white flex items-center gap-2"
            >
              <Download size={16} />
              Export
            </button>

            {/* trust badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-950/60">

              <ShieldCheck className="text-emerald-300" size={16} />

              <div className="leading-tight">
                <p className="text-xs font-semibold text-white">Ready</p>
                <p className="text-[10px] text-slate-500">Enterprise PDF</p>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}