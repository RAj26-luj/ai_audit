interface Props {
  teamSize: number;

  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;
}

//team input
export default function TeamSizeInput({
  teamSize,
  setFormData,
}: Props) {

  return (
    <div>

      <label className="text-sm text-zinc-400 block mb-2">
        Team Size
      </label>

      <input
        type="number"
        min={1}
        step="1"

        value={
          teamSize === 0
            ? ""
            : teamSize
        }

        onChange={(e) => {

          const v = e.target.value;

          setFormData((prev: any) => ({
            ...prev,

            teamSize:
              v === ""
                ? 0
                : Number(v),
          }));
        }}

        onKeyDown={(e) => {

          if (
            e.key === "-" ||
            e.key === "+" ||
            e.key === "e"
          ) {
            e.preventDefault();
          }
        }}

        className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
      />

    </div>
  );
}