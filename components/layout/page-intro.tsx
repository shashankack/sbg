"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/animations";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  lede: string;
};

export function PageIntro({ eyebrow, title, lede }: PageIntroProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const timeline = gsap.timeline({ defaults: { ease: EASE.out } });
      timeline
        .from("[data-intro-kicker]", { opacity: 0, y: 12, duration: 0.45 })
        .from("[data-intro-title]", { yPercent: 100, duration: 0.7 }, 0.1)
        .from("[data-intro-lede]", { opacity: 0, y: 16, duration: 0.5 }, 0.28);
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="mx-auto max-w-[1400px] px-6 pt-32 pb-8 md:px-10 md:pt-40"
    >
      <p
        data-intro-kicker
        className="font-mono text-[11px] tracking-[0.22em] text-white/50"
      >
        {eyebrow}
      </p>
      <div className="mt-6 overflow-hidden">
        <h1
          data-intro-title
          className="text-[clamp(56px,8vw,120px)] leading-[0.86] font-medium tracking-[-0.055em]"
        >
          {title}
        </h1>
      </div>
      <p
        data-intro-lede
        className="mt-8 max-w-[46ch] text-base leading-relaxed text-muted md:text-lg"
      >
        {lede}
      </p>
    </header>
  );
}
