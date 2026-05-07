// tool name and status

type Props = {
  tool: {
    name: string;
  };

  isSelected: boolean;
};

export default function ToolText({
  tool,
  isSelected,
}: Props) {

  return (
    <div className="space-y-1">

      <div
        className={`font-bold text-lg tracking-tight ${
          isSelected
            ? "text-white"
            : "text-gray-400"
        }`}
      >

        {tool.name}
      </div>

      <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">

        {isSelected
          ? "Selected"
          : "Tap to Add"}
      </div>
    </div>
  );
}