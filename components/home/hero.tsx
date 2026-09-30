"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TechText from "@/components/react-bits/tech-text";
import { HeroOrbit } from "@/components/effects/hero-orbit";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/animations";

const meta = [
  { label: "STATUS", value: "ONLINE", live: true },
  { label: "REGION", value: "BLR" },
  { label: "MODE", value: "BUILD" },
];

const BOOT_KEY = "sbg-boot";

function bootAlreadyPlayed() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const effectsLive = useRef(true);
  const [headlineLive, setHeadlineLive] = useState(true);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      const armScroll = () => {
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
              .to("[data-hero-copy]", { y: -88, opacity: 0.14, ease: "none" }, 0)
              .to("[data-hero-meta]", { y: -20, opacity: 0.35, ease: "none" }, 0)
              .to("[data-hero-visual]", { y: -18, opacity: 0.8, ease: "none" }, 0)
              .to("[data-orbit-rings]", { scale: 1.14, rotation: 16, ease: "none" }, 0)
              .to("[data-hero-haze]", { y: 48, opacity: 0.45, ease: "none" }, 0);
          },
        );
      };

      const html = document.documentElement;
      const previousOverflow = html.style.overflow;
      let releaseScroll = () => {
        html.style.overflow = previousOverflow;
      };

      const skipBoot = reducedMotion() || bootAlreadyPlayed();
      if (skipBoot) {
        gsap.set("[data-boot]", { autoAlpha: 0 });
        document.getElementById("sbg-boot-style")?.remove();
        armScroll();
      } else {
        html.style.overflow = "hidden";
        const count = root.current?.querySelector<HTMLElement>("[data-boot-count]");
        const counter = { n: 0 };
        const intro = gsap.timeline({
          defaults: { ease: EASE.out },
          onComplete: () => {
            releaseScroll();
            releaseScroll = () => {};
            try {
              sessionStorage.setItem(BOOT_KEY, "1");
            } catch {
              /* private mode */
            }
            document.getElementById("sbg-boot-style")?.remove();
            gsap.set("[data-boot]", { autoAlpha: 0 });
            armScroll();
          },
        });

        intro
          .fromTo(
            "[data-boot-rule]",
            { scaleY: 0 },
            { scaleY: 1, duration: 0.72, ease: "power3.inOut" },
            0.08,
          )
          .from("[data-boot-mark]", { autoAlpha: 0, duration: 0.35 }, 0.32)
          .to(
            counter,
            {
              n: 100,
              duration: 0.9,
              ease: "power1.in",
              onUpdate: () => {
                if (!count) return;
                count.textContent = String(Math.round(counter.n)).padStart(3, "0");
              },
            },
            0.28,
          )
          .to("[data-boot-mark]", { autoAlpha: 0, duration: 0.22, ease: "power2.in" }, 1.12)
          .to("[data-boot-rule]", { autoAlpha: 0, duration: 0.18 }, 1.12)
          .to(
            "[data-boot-top]",
            { yPercent: -100, duration: 1.05, ease: "power4.inOut" },
            1.12,
          )
          .to(
            "[data-boot-bottom]",
            { yPercent: 100, duration: 1.05, ease: "power4.inOut" },
            1.12,
          )
          .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 14, duration: 0.45 }, 1.28)
          .from("[data-hero-build]", { yPercent: 115, duration: 0.9, ease: EASE.cinematic }, 1.34)
          .from("[data-hero-beyond]", { yPercent: 115, duration: 0.9, ease: EASE.cinematic }, 1.48)
          .from("[data-hero-desc]", { autoAlpha: 0, y: 18, duration: 0.5 }, 1.62)
          .from("[data-hero-actions]", { autoAlpha: 0, y: 14, duration: 0.45 }, 1.76)
          .from(
            "[data-hero-meta] > div",
            { autoAlpha: 0, y: 12, stagger: 0.07, duration: 0.4 },
            1.88,
          )
          .from(
            "[data-hero-visual]",
            { autoAlpha: 0, scale: 0.78, rotation: -14, duration: 1.2, ease: EASE.cinematic },
            1.22,
          )
          .from("[data-hero-caption]", { autoAlpha: 0, y: 8, duration: 0.4 }, 1.7);
      }

      return () => {
        releaseScroll();
        motion.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative z-0 flex min-h-[100svh] flex-col overflow-x-clip lg:sticky lg:top-0 lg:h-[100svh]"
    >
      <div data-boot aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
        <div data-boot-top className="absolute inset-x-0 top-0 h-1/2 bg-black" />
        <div data-boot-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-black" />
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2">
          <div data-boot-rule className="h-full w-full origin-center bg-[#B000B2]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div data-boot-mark className="flex flex-col items-center gap-3 bg-black px-5 py-2">
            <span className="font-mono text-[11px] tracking-[0.32em] text-white/75">AWS SBG</span>
            <span data-boot-count className="font-mono text-[12px] tracking-[0.28em] text-[#B000B2]">
              000
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pt-28 pb-8 lg:px-10 lg:pt-32 xl:px-14">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-6">
          <div data-hero-copy>
            <p
              data-hero-eyebrow
              className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-white/80"
            >
              <span className="status-dot" aria-hidden />
              AWS STUDENT BUILDERS GROUP
            </p>

            <h1 className="mt-6 text-[clamp(56px,14vw,78px)] leading-[0.84] font-medium tracking-[-0.06em] lg:text-[clamp(68px,6.6vw,124px)]">
              <span className="block overflow-hidden">
                <span data-hero-build className="block">
                  BUILD
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="sr-only">BEYOND.</span>
                <span data-hero-beyond aria-hidden className="block h-[0.86em] w-[4.7em]">
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

            <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/#join" className="cta-luminous">
                Enter the club
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link href="/#about-preview" className="cta-ghost">
                Explore
              </Link>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[520px]">
            <figcaption
              data-hero-caption
              className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-white/65"
            >
              <span>01 / SIGNAL</span>
              <span className="text-[#B000B2]">LIVE</span>
            </figcaption>
            <div className="relative">
              <span className="pointer-events-none absolute top-2 left-2 z-[3] h-3 w-3 border-t border-l border-white/30" />
              <span className="pointer-events-none absolute top-2 right-2 z-[3] h-3 w-3 border-t border-r border-white/30" />
              <span className="pointer-events-none absolute bottom-2 left-2 z-[3] h-3 w-3 border-b border-l border-white/30" />
              <span className="pointer-events-none absolute right-2 bottom-2 z-[3] h-3 w-3 border-r border-b border-white/30" />
              <HeroOrbit />
            </div>
          </figure>
        </div>

        <dl
          data-hero-meta
          className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 lg:mt-2"
        >
          {meta.map((item) => (
            <div key={item.label} className="min-w-0">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-white/60">{item.label}</dt>
              <dd className="mt-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em]">
                {item.live ? <span className="size-1.5 bg-[#B000B2]" aria-hidden /> : null}
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
