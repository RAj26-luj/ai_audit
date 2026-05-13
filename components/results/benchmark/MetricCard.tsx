interface Props {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  progress?: number;
  progressColor?: string;
}

//metric card
export default function MetricCard({
  icon,
  label,
  value,
  description,
  progress,
  progressColor,
}: Props) {

  return (

    <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

      {/* icon */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${progressColor}`}>
        {icon}
      </div>

      {/* label */}
      <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
        {label}
      </p>

      {/* value */}
      <p className="text-4xl font-black">
        {value}
      </p>

      {/* progress */}
      {typeof progress === "number" && (
        <div className="mt-4 w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* description */}
      <p className="text-sm text-gray-400 mt-3 leading-6">
        {description}
      </p>

    </div>
  );
}