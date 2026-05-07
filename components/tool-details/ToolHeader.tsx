// top tool info section

type Props = {
  tool: {
    name: string;
    icon: string;
  };
};

export default function ToolHeader({
  tool,
}: Props) {

  return (
    <div className="flex items-center gap-4 mb-8">

      {/* icon */}
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">

        <img
          src={tool.icon}
          alt={tool.name}
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* text */}
      <div>

        <h3 className="text-xl font-bold">

          {tool.name}
        </h3>

        <p className="text-gray-500 text-sm">

          Configure usage details
        </p>
      </div>
    </div>
  );
}