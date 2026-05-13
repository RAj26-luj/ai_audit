"use client";

//landing ui
import HeroSection from "./HeroSection";
import FeatureCards from "./FeatureCards";
import FooterHint from "./FooterHint";
import BackgroundEffects from "./BackgroundEffects";
import Spotlight from "./Spotlight";

import { useLandingEffects } from "./hooks/useLandingEffects";

type StepType = "landing" | "inputs" | "loading" | "results";

type Props = {
  setStep: React.Dispatch<
    React.SetStateAction<StepType>
  >;
};

//landing page
export default function Landing({
  setStep,
}: Props) {

  //effects
  const {
    containerRef, rotateX, rotateY,
    spotlightPos, isHovering,
    handleMouseMove, handleMouseLeave,
    mouseXSpring, mouseYSpring,
  } = useLandingEffects();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-x-hidden bg-[#020205]"
    >

      {/* bg */}
      <BackgroundEffects mouseXSpring={mouseXSpring} mouseYSpring={mouseYSpring} />

      {/* light */}
      <Spotlight spotlightPos={spotlightPos} isHovering={isHovering} />

      {/* hero */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <HeroSection setStep={setStep} rotateX={rotateX} rotateY={rotateY} />
      </section>

      {/* cards */}
      <section id="features" className="relative z-10 flex justify-center px-4 pb-32">
        <FeatureCards />
      </section>

      {/* audit */}
      <section id="audit-form" className="relative z-10 flex flex-col items-center justify-center text-center px-4 pb-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-indigo-400 mb-6">
            AI Spend Intelligence
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Optimize Your AI Stack
          </h2>

          <p className="text-lg text-gray-400 mt-6 leading-relaxed">
            Analyze subscriptions, identify waste, benchmark spending, and generate actionable savings recommendations in seconds.
          </p>

          <button onClick={() => setStep("inputs")} className="mt-10 px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:scale-105 transition-transform">
            Start Your Audit
          </button>
        </div>
      </section>

      {/* footer */}
      <FooterHint />

    </div>
  );
}