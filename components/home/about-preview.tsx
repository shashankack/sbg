"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LetterGlitch from "@/components/react-bits/letter-glitch";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/animations";

export function AboutPreview() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
        },
      });

      enter
        .from("[data-about-label]", { opacity: 0, y: 12, duration: 0.45, ease: EASE.out })
        .from(
          "[data-about-line]",
          { yPercent: 100, duration: 0.7, stagger: 0.12, ease: EASE.out },
          0.08,
        )
        .from(
          "[data-about-body]",
          { opacity: 0, y: 18, duration: 0.55, ease: EASE.out },
          0.28,
        );

      gsap.fromTo(
        "[data-about-bg]",
        { xPercent: -18 },
        {
          xPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.45,
          },
        },
      );

      gsap.fromTo(
        "[data-about-copy]",
        { y: 36 },
        {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.45,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about-preview"
      className="surface relative z-10 overflow-hidden border-t border-white/15"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,transparent_24%,transparent_76%,black_100%)]"
        aria-hidden
      >
        <LetterGlitch
          glitchColors={["#2a0244", "#380356", "#5c0678"]}
          glitchSpeed={140}
          centerVignette={false}
          outerVignette={false}
          smooth
          backgroundColor="transparent"
          characters="01AWSBG<>/{}[]"
          className="h-full w-full"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center overflow-hidden">
        <p
          data-about-bg
          aria-hidden
          className="pl-[4vw] text-[clamp(88px,18vw,280px)] leading-none font-medium tracking-[-0.07em] whitespace-nowrap text-transparent opacity-[0.045] [-webkit-text-stroke:1px_white]"
        >
          BUILDERS
        </p>
      </div>

      <div
        data-about-copy
        className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-6 py-28 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:py-40"
      >
        <div>
          <p
            data-about-label
            className="font-mono text-[11px] tracking-[0.22em] text-white/70"
          >
            {"// 01 — ABOUT"}
          </p>
          <h2 className="mt-6 text-[clamp(48px,6.4vw,96px)] leading-[0.88] font-medium tracking-[-0.055em]">
            <span className="block overflow-hidden">
              <span data-about-line className="block">
                NOT JUST
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-about-line className="block">
                ANOTHER CLUB.
              </span>
            </span>
          </h2>
        </div>

        <div data-about-body className="max-w-[46ch] pb-2">
          <p className="text-base leading-relaxed text-muted">
            AWS SBG exists for students who would rather build something real
            than sit through another slideshow.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted">
            We experiment with cloud infrastructure, serverless systems, AI,
            DevOps and everything between idea and deployment.
          </p>
          <Link
            href="/about"
            className="footer-link mt-8 inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.2em] uppercase"
          >
            Discover our story
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
