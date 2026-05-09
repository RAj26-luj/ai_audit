// results page header

import {
  CheckCircle2,
  Download,
} from "lucide-react";
import ShareButton from "./ShareButton";

export default function ResultsHeader() {

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">

      <div>

        <div className="flex items-center gap-2 mb-3">

          <span className="bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1 border border-green-500/20">

            <CheckCircle2 size={12} />

            Audit Complete
          </span>

          <span className="text-gray-500 text-sm italic">

            Generated moments ago
          </span>
        </div>

        <h1 className="text-5xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">

          Optimization Report
        </h1>
      </div>

      <div className="flex gap-3">

        <ShareButton />

        <div className="hidden">
        <Download size={18} />
        </div>
      </div>
    </div>
  );
}