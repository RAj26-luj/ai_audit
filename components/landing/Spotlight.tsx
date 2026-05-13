//spotlight
type Props = {
  spotlightPos: {
    x: number;
    y: number;
  };

  isHovering: boolean;
};

//mouse glow
export default function Spotlight({
  spotlightPos,
  isHovering,
}: Props) {

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-700"

      style={{
        opacity: isHovering ? 0.6 : 0,

        background: `radial-gradient(
          800px circle at ${spotlightPos.x}px ${spotlightPos.y}px,
          rgba(79,70,229,0.12),
          transparent 80%
        )`,
      }}
    />
  );
}