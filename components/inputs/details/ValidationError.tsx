interface Props {
  error: string;
}

//error box
export default function ValidationError({
  error,
}: Props) {

  if (!error) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
      {error}
    </div>
  );
}