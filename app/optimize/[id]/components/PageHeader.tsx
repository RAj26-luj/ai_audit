import Link from "next/link";

import {
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface Props {
  id: string;
}

export default function PageHeader({
  id,
}: Props) {

  return (

    <div className="flex items-center justify-between mb-10">

      <Link
        href={
          id === "demo"
            ? "/demo"
            : `/audit/${id}`
        }
        className="flex items-center gap-2 text-gray-400 hover:text-white transition"
      >

        <ArrowLeft size={18} />

        Back to Audit

      </Link>

      <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">

        <Sparkles size={16} />

        Interactive Optimization Engine

      </div>

    </div>
  );
}