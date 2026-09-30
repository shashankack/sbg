"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ShapeWaves from "@/components/react-bits/shape-waves";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/animations";

export function AboutPreview() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 74%",
        },
      });

      enter
        .from("[data-about-label]", { autoAlpha: 0, y: 14, duration: 0.45, ease: EASE.out })
        .from(
          "[data-about-line]",
          { yPercent: 110, duration: 0.75, stagger: 0.1, ease: EASE.cinematic },
          0.08,
        )
        .from("[data-about-body]", { autoAlpha: 0, y: 20, duration: 0.55, ease: EASE.out }, 0.28);

      gsap.fromTo(
        "[data-about-field]",
        { yPercent: -6 },
        {
          yPercent: 6,
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
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div data-about-field className="absolute -inset-y-[8%] inset-x-0">
          <ShapeWaves
            color="#93009C"
            hoverColor="#B000B2"
            backgroundColor="#241030"
            shapes="mixed"
            cellSize={12}
            dotSize={0.8}
            speed={0.45}
            scale={1.05}
            contrast={1.1}
            brightness={0.62}
            flow={0.35}
            glow={0.4}
            fade={0.18}
            interactive
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(36,16,48,0.2),rgba(36,16,48,0.72)_18%,rgba(36,16,48,0.78)_82%,rgba(36,16,48,0.25))] lg:bg-[linear-gradient(90deg,rgba(36,16,48,0.88)_0%,rgba(36,16,48,0.7)_40%,rgba(36,16,48,0.58)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-6 py-28 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:py-40">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-6 bg-[#241030]/55"
          />
          <div className="relative">
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
        </div>

        <div data-about-body className="relative max-w-[46ch] pb-2">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-5 bg-[#241030]/82"
          />
          <div className="relative">
          <p className="text-base leading-relaxed text-muted md:text-lg">
            AWS SBG exists for students who would rather build something real
            than sit through another slideshow.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            We experiment with cloud infrastructure, serverless systems, AI,
            DevOps and everything between idea and deployment.
          </p>
          <Link
            href="/about"
            className="footer-link group mt-8 inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.2em] uppercase"
          >
            Discover our story
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
