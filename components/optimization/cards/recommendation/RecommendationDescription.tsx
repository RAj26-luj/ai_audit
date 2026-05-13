interface Props {
  description: string;
}

//description
export default function RecommendationDescription({
  description,
}: Props) {

  return (
    <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-7 break-words">
      {description}
    </p>
  );
}