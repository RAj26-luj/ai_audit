interface Props {
  label: string;
  value: number;
  color: string;
}

//progress bar
export default function ProgressMetric({
  label,
  value,
  color,
}: Props) {

  return (

    <div>

      {/* header */}
      <div className="flex items-center justify-between mb-2">

        <span className="text-sm text-gray-400">
          {label}
        </span>

        <span className="text-sm font-semibold text-white">
          {value}%
        </span>

      </div>

      {/* bar */}
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">

        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}