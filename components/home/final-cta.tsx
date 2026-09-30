"use client";

import { useSyncExternalStore } from "react";
import { JoinDialog } from "@/components/layout/join-dialog";
import { SectionReveal } from "@/components/effects/section-reveal";
import GradientWaves from "@/components/react-bits/gradient-waves";

function useReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function FinalCta() {
  const reduced = useReducedMotion();

  return (
    <SectionReveal>
      <section id="join" className="relative scroll-mt-28 overflow-hidden bg-black">
        <div className="absolute inset-0" aria-hidden>
          <GradientWaves
            horizonColor="#000000"
            waveColor="#6B0078"
            crestColor="#B000B2"
            speed={reduced ? 0 : 0.22}
            amplitude={2.1}
            waveScale={1.05}
            detail="low"
            brightness={0.72}
            opacity={0.8}
            mouseInteraction={!reduced}
            parallaxStrength={0.35}
            grain
            grainIntensity={0.035}
            className="h-full w-full"
          />
        </div>
        <div className="pointer-events-none relative mx-auto max-w-[1400px] px-6 py-32 md:px-10 lg:py-44">
          <p className="font-mono text-[11px] tracking-[0.22em] text-white/45">
            {"// 03 — ACCESS"}
          </p>
          <h2 className="mt-6 max-w-[12ch] text-[clamp(48px,7vw,104px)] leading-[0.88] font-medium tracking-[-0.055em]">
            YOUR NEXT BUILD
            <br />
            STARTS HERE.
          </h2>
          <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg">
            Come for AWS. Stay for the people, projects, experiments and the
            slightly unreasonable urge to make things work.
          </p>
          <div className="pointer-events-auto mt-10">
            <JoinDialog label="Join AWS SBG" className="cta-luminous cta-luminous-lg" />
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
