// reusable field label

type Props = {
  icon: React.ReactNode;

  text: string;
};

export default function FieldLabel({
  icon,
  text,
}: Props) {

  return (
    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">

      {icon}

      {text}
    </label>
  );
}