interface Props {
  useCase: string;

  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;
}

//use case select
export default function UseCaseSelect({
  useCase,
  setFormData,
}: Props) {

  return (
    <div>

      <label className="text-sm text-zinc-400 block mb-2">
        Primary Use Case
      </label>

      <select
        value={useCase || "coding"}

        onChange={(e) =>
          setFormData((prev: any) => ({
            ...prev,
            useCase: e.target.value,
          }))
        }

        className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
      >

        <option value="coding">Coding</option>
        <option value="writing">Writing</option>

        <option value="research">Research</option>
        <option value="data">Data</option>

        <option value="mixed">Mixed</option>

      </select>

    </div>
  );
}