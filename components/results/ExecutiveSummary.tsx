// ai summary section

import {
  Sparkles,
} from "lucide-react";

type Props = {
  summary?: string;
};

export default function ExecutiveSummary({
  summary,
}: Props) {

  return (
    <section className="bg-white/5 rounded-3xl p-8 border border-white/10">

      <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">

        <Sparkles
          className="text-indigo-400"
          size={22}
        />

        AI Executive Summary
      </h3>

      <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">

        {summary ||
          "Your organization may be overspending on AI tooling."}
      </p>
    </section>
  );
}