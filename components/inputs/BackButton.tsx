//back button
import { ArrowLeft } from "lucide-react";

type Props = {
  goBack: () => void;
};

//navigation button
export default function BackButton({
  goBack,
}: Props) {

  return (
    <button
      onClick={goBack}
      className="inline-flex items-center gap-2 mb-6"
    >

      <ArrowLeft size={14} />
      Back

    </button>
  );
}