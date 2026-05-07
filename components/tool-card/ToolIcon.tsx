// tool icon section

type Props = {
  tool: {
    icon: string;
    name: string;
  };
};

export default function ToolIcon({
  tool,
}: Props) {

  return (
    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5">

      <img
        src={tool.icon}
        alt={tool.name}

        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
}