import { Download, Loader2, FileText } from "lucide-react";

interface Props {
  loading: boolean;
}

//export content
export default function ExportButtonContent({ loading }: Props) {

  return (
    <>

      {/* icon */}
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <Download size={20} />
      )}

      {/* text */}
      <div className="flex flex-col items-start">

        <span className="text-sm font-bold">
          {loading ? "Preparing PDF..." : "Export PDF Report"}
        </span>

        <span className="text-[11px] text-indigo-200 flex items-center gap-1">
          <FileText size={10} />
          Printable audit summary
        </span>

      </div>

    </>
  );
}