"use client";

// main landing wrapper

import HeroSection from "./HeroSection";
import FeatureCards from "./FeatureCards";
import FooterHint from "./FooterHint";
import BackgroundEffects from "./BackgroundEffects";
import Spotlight from "./Spotlight";

import { useLandingEffects } from "./hooks/useLandingEffects";

type StepType =
  | "landing"
  | "inputs"
  | "loading"
  | "results";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<StepType>
  >;
};

export default function Landing({
  setStep,
}: Props) {

  const {
    containerRef,
    rotateX,
    rotateY,
    spotlightPos,
    isHovering,
    handleMouseMove,
    handleMouseLeave,
    mouseXSpring,
    mouseYSpring,
  } = useLandingEffects();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020205] px-4 py-20"
    >

      <BackgroundEffects
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
      />

      <Spotlight
        spotlightPos={spotlightPos}
        isHovering={isHovering}
      />

      <HeroSection
        setStep={setStep}
        rotateX={rotateX}
        rotateY={rotateY}
      />

      <FeatureCards />

      <FooterHint />
    </div>
  );
}