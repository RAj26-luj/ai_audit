// title and subtitle

type Props = {
  title: string;

  subtitle: string;
};

export default function HeaderTitle({
  title,
  subtitle,
}: Props) {

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">

        {title}
      </h2>

      <p className="text-gray-500 mt-4 text-lg">

        {subtitle}
      </p>
    </>
  );
}