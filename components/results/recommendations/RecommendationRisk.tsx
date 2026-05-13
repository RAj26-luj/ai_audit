type Props = {
  risk?: string;
};

// recommendation risk badge
export default function RecommendationRisk({ risk }: Props) {
  return (
    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10">
      {risk || "Low"} Risk
    </span>
  );
}