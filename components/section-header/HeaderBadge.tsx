// top badge text

type Props = {
  badge: string;
};

export default function HeaderBadge({
  badge,
}: Props) {

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">

      {badge}
    </div>
  );
}