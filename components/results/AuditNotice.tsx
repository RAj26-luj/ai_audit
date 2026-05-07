// audit info notice

import {
  AlertCircle,
} from "lucide-react";

export default function AuditNotice() {

  return (
    <div className="flex items-center gap-3 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">

      <AlertCircle
        className="text-indigo-400"
        size={20}
      />

      <p className="text-xs text-indigo-200">

        Audit generated dynamically using your tool usage.
      </p>
    </div>
  );
}