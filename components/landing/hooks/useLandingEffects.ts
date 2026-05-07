// mouse and animation logic
import { useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function useLandingEffects() {

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  // mouse values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 150,
    damping: 20,
  });

  const mouseYSpring = useSpring(y, {
    stiffness: 150,
    damping: 20,
  });

  // tilt effect
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );

  // spotlight
  const [spotlightPos, setSpotlightPos] =
    useState({
      x: 0,
      y: 0,
    });

  const [isHovering, setIsHovering] =
    useState(false);

  // mouse move
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    if (!containerRef.current) return;

    const rect =
      containerRef.current.getBoundingClientRect();

    const mouseX =
      e.clientX - rect.left;

    const mouseY =
      e.clientY - rect.top;

    const xPct =
      mouseX / rect.width - 0.5;

    const yPct =
      mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setSpotlightPos({
      x: mouseX,
      y: mouseY,
    });

    setIsHovering(true);
  };

  // reset
  const handleMouseLeave = () => {

    x.set(0);
    y.set(0);

    setIsHovering(false);
  };

  return {
    containerRef,

    rotateX,
    rotateY,

    spotlightPos,
    isHovering,

    handleMouseMove,
    handleMouseLeave,

    mouseXSpring,
    mouseYSpring,
  };
}