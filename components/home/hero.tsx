"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AeroShards from "@/components/react-bits/aero-shards";
import TechText from "@/components/react-bits/tech-text";
import { HeroOrbit } from "@/components/effects/hero-orbit";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/animations";

const meta = [
  { label: "STATUS", value: "ONLINE", live: true },
  { label: "REGION", value: "BLR" },
  { label: "MODE", value: "BUILD" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const effectsLive = useRef(true);
  const [headlineLive, setHeadlineLive] = useState(true);
  const [shardsOn, setShardsOn] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setShardsOn(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      if (!reducedMotion()) {
        const intro = gsap.timeline({
          defaults: { ease: EASE.out },
          delay: 0.12,
        });
        intro
          .from(
            "[data-hero-eyebrow]",
            { opacity: 0, y: 16, duration: 0.45 },
            0.05,
          )
          .from("[data-hero-build]", { yPercent: 100, duration: 0.75 }, 0.16)
          .from("[data-hero-beyond]", { yPercent: 100, duration: 0.75 }, 0.3)
          .from("[data-hero-desc]", { opacity: 0, y: 18, duration: 0.48 }, 0.58)
          .from(
            "[data-hero-actions]",
            { opacity: 0, y: 14, duration: 0.42 },
            0.74,
          )
          .from("[data-hero-meta]", { opacity: 0, y: 12, duration: 0.4 }, 0.9)
          .from(
            "[data-hero-visual]",
            {
              scale: 0.88,
              opacity: 0,
              rotation: -6,
              duration: 1.1,
              ease: EASE.cinematic,
            },
            0.22,
          );
      }

      const motion = gsap.matchMedia();
      motion.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const exit = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.45,
              onUpdate: (self) => {
                const live = self.progress < 0.68;
                if (live === effectsLive.current) return;
                effectsLive.current = live;
                setHeadlineLive(live);
              },
            },
          });

          exit
            .to("[data-hero-copy]", { y: -120, opacity: 0.12, ease: "none" }, 0)
            .to(
              "[data-hero-visual]",
              { y: -28, opacity: 0.82, ease: "none" },
              0,
            )
            .to(
              "[data-orbit-rings]",
              { scale: 1.16, rotation: 18, ease: "none" },
              0,
            )
            .to("[data-hero-haze]", { y: 80, opacity: 0.4, ease: "none" }, 0);
        },
      );

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative z-0 flex min-h-[100svh] flex-col justify-start overflow-x-clip px-6 pt-28 pb-16 lg:sticky lg:top-0 lg:h-[100svh] lg:justify-center lg:px-0 lg:py-0"
    >
      <div
        data-hero-copy
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center lg:min-h-[100svh] lg:px-10 xl:px-14"
      >
        <p
          data-hero-eyebrow
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-white/60"
        >
          <span className="status-dot" aria-hidden />
          AWS STUDENT BUILDERS GROUP
        </p>

        <h1 className="mt-6 text-[clamp(56px,14vw,78px)] leading-[0.84] font-medium tracking-[-0.06em] md:text-[clamp(72px,9vw,150px)]">
          <span className="block overflow-hidden">
            <span data-hero-build className="block">
              BUILD
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="sr-only">BEYOND.</span>
            <span
              data-hero-beyond
              aria-hidden
              className="block h-[0.86em] w-[4.7em]"
            >
              <TechText
                text="BEYOND."
                color="#ffffff"
                accentColor="#B000B2"
                fontWeight={500}
                fontSize={160}
                letterSpacing={-0.06}
                reveal="letter"
                labels={false}
                specks={6}
                selection={false}
                sweep
                speed={0.55}
                align="left"
                paused={!headlineLive}
                className="h-full w-full"
              />
            </span>
          </span>
        </h1>

        <p
          data-hero-desc
          className="mt-7 max-w-[42ch] text-[15px] leading-7 text-muted md:text-base"
        >
          AWS Student Builders Group is a community for students who want to go
          beyond tutorials — building, deploying and experimenting with real
          systems using cloud technology.
        </p>

        <div
          data-hero-actions
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link href="/#join" className="cta-luminous">
            Enter the club
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <Link href="/#about-preview" className="cta-ghost">
            Explore
          </Link>
        </div>

        <dl
          data-hero-meta
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-10"
        >
          {meta.map((item) => (
            <div key={item.label} className="flex items-baseline gap-4">
              <dt className="w-16 font-mono text-[10px] tracking-[0.2em] text-white/40">
                {item.label}
              </dt>
              <dd className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em]">
                {item.live ? (
                  <span className="size-1.5 bg-[#B000B2]" aria-hidden />
                ) : null}
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <HeroOrbit />
    </section>
  );
}
