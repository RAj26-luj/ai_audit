import TeamSizeInput from "./TeamSizeInput";
import UseCaseSelect from "./UseCaseSelect";

interface Props {
  formData: any;

  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;
}

//details form
export default function DetailsFormSection({
  formData,
  setFormData,
}: Props) {

  return (
    <div className="grid md:grid-cols-2 gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

      <TeamSizeInput
        teamSize={formData.teamSize}
        setFormData={setFormData}
      />

      <UseCaseSelect
        useCase={formData.useCase}
        setFormData={setFormData}
      />

    </div>
  );
}