// reusable input field

type Props = {
  label: string;

  icon: React.ReactNode;

  type: string;

  placeholder: string;

  value: any;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function FormInput({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
}: Props) {

  return (
    <div>

      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">

        {icon}

        {label}
      </label>

      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}

        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none focus:border-indigo-500"
      />
    </div>
  );
}