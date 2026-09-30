"use client";

import { useRef, type PointerEvent } from "react";
import { EASE, gsap, useGSAP } from "@/lib/animations";

const stages = [
  { key: "idea", label: "IDEA" },
  { key: "code", label: "CODE" },
  { key: "cloud", label: "CLOUD" },
  { key: "reality", label: "REALITY" },
] as const;

function SequenceField() {
  return (
    <svg
      viewBox="0 0 1200 640"
      className="absolute inset-0 h-full w-full opacity-80 lg:opacity-100"
      aria-hidden
    >
      <g stroke="#6B0078" fill="none" opacity="0.55">
        <circle cx="600" cy="320" r="70" />
        <circle cx="600" cy="320" r="150" />
        <circle cx="600" cy="320" r="240" />
        <line x1="600" y1="70" x2="600" y2="570" strokeWidth="0.6" />
        <line x1="340" y1="320" x2="860" y2="320" strokeWidth="0.6" />
      </g>
      <g data-net="early" stroke="#6B0078" fill="none">
        <line x1="140" y1="430" x2="300" y2="250" strokeWidth="1.2" />
        <line x1="300" y1="250" x2="250" y2="140" strokeWidth="1.2" />
        <rect x="132" y="422" width="14" height="14" fill="#B000B2" stroke="none" />
        <rect x="292" y="242" width="12" height="12" fill="#ffffff" stroke="none" />
        <rect x="244" y="132" width="10" height="10" fill="#93009C" stroke="none" />
      </g>
      <g data-net="mid" stroke="#93009C" fill="none">
        <line x1="300" y1="250" x2="560" y2="300" strokeWidth="1.2" />
        <line x1="560" y1="300" x2="700" y2="170" strokeWidth="1.2" />
        <line x1="560" y1="300" x2="780" y2="360" strokeWidth="1.2" />
        <circle cx="560" cy="300" r="5" fill="#B000B2" stroke="none" />
        <rect x="692" y="162" width="12" height="12" fill="#ffffff" stroke="none" />
        <rect x="772" y="352" width="12" height="12" fill="#93009C" stroke="none" />
      </g>
      <g data-net="late" stroke="#B000B2" fill="none">
        <line x1="780" y1="360" x2="980" y2="230" strokeWidth="1.2" />
        <line x1="700" y1="170" x2="980" y2="230" strokeWidth="1.2" />
        <line x1="600" y1="320" x2="780" y2="360" strokeWidth="1.2" />
        <rect x="972" y="222" width="14" height="14" fill="#B000B2" stroke="none" />
      </g>
      <g data-core>
        <circle cx="600" cy="320" r="18" fill="#B000B2" />
        <circle cx="600" cy="320" r="46" fill="none" stroke="#B000B2" strokeWidth="1" />
        <text
          x="140"
          y="470"
          fill="rgba(255,255,255,0.45)"
          fontSize="13"
          fontFamily="var(--font-geist-mono), ui-monospace"
        >
          01
        </text>
        <text
          x="560"
          y="340"
          fill="rgba(255,255,255,0.45)"
          fontSize="13"
          fontFamily="var(--font-geist-mono), ui-monospace"
        >
          02
        </text>
        <text
          x="990"
          y="210"
          fill="rgba(255,255,255,0.45)"
          fontSize="13"
          fontFamily="var(--font-geist-mono), ui-monospace"
        >
          03
        </text>
      </g>
    </svg>
  );
}

export function ExperienceSection() {
  const root = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);

  const shiftField = (event: PointerEvent<HTMLElement>) => {
    const node = field.current;
    if (!node || event.pointerType !== "mouse") return;
    if (
      !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)")
        .matches
    ) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 28;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
    node.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const resetField = () => {
    if (field.current) field.current.style.transform = "translate3d(0, 0, 0)";
  };

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            "[data-word='idea']",
            { opacity: 0.18, y: 26 },
            { opacity: 1, y: 0, duration: 0.2, ease: "none" },
            0,
          )
          .fromTo(
            "[data-net='early']",
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "none" },
            0.2,
          )
          .fromTo(
            "[data-word='code']",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.2, ease: "none" },
            0.4,
          )
          .fromTo(
            "[data-net='mid']",
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "none" },
            0.4,
          )
          .fromTo(
            "[data-arrow='code']",
            { opacity: 0 },
            { opacity: 1, duration: 0.12, ease: "none" },
            0.46,
          )
          .fromTo(
            "[data-word='cloud']",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.2, ease: "none" },
            0.6,
          )
          .fromTo(
            "[data-net='late']",
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "none" },
            0.6,
          )
          .fromTo(
            "[data-core]",
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: "none" },
            0.62,
          )
          .fromTo(
            "[data-core-glow]",
            { opacity: 0, scale: 0.65 },
            { opacity: 1, scale: 1.12, duration: 0.2, ease: "none" },
            0.62,
          )
          .fromTo(
            "[data-arrow='cloud']",
            { opacity: 0 },
            { opacity: 1, duration: 0.12, ease: "none" },
            0.66,
          )
          .fromTo(
            "[data-word='reality']",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.2, ease: "none" },
            0.8,
          )
          .fromTo(
            "[data-arrow='reality']",
            { opacity: 0 },
            { opacity: 1, duration: 0.12, ease: "none" },
            0.86,
          )
          .fromTo(
            "[data-progress]",
            { scaleY: 0 },
            { scaleY: 1, duration: 1, ease: "none" },
            0,
          )
          .to("[data-scroll-hint]", { opacity: 0, duration: 0.15, ease: "none" }, 0.05);
      });

      motion.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-word]", root.current).forEach((word) => {
          gsap.from(word, {
            opacity: 0,
            y: 20,
            duration: 0.55,
            ease: EASE.out,
            scrollTrigger: {
              trigger: word,
              start: "top 88%",
            },
          });
        });
      });

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-word], [data-net], [data-core], [data-core-glow], [data-arrow]", {
          opacity: 1,
          y: 0,
        });
        gsap.set("[data-progress]", { scaleY: 1 });
        gsap.set("[data-scroll-hint]", { opacity: 0 });
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative bg-black"
      onPointerMove={shiftField}
      onPointerLeave={resetField}
    >
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-28 pb-10 md:px-10 lg:h-[100svh]">
        <div
          aria-hidden
          className="absolute top-24 bottom-24 left-6 hidden w-px bg-white/10 md:left-10 lg:block"
        >
          <div data-progress className="h-full w-px origin-top bg-[#B000B2]" />
        </div>

        <header className="relative z-10 max-w-md lg:pl-8">
          <p className="font-mono text-[11px] tracking-[0.22em] text-white/45">
            {"// SEQUENCE"}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            An idea, written down, connected, and left running.
          </p>
        </header>

        <div
          ref={field}
          className="pointer-events-none absolute inset-x-4 top-28 bottom-24 will-change-transform md:inset-x-16"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              data-core-glow
              className="h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(176,0,178,0.45),rgba(56,3,86,0.15)_42%,transparent_70%)] opacity-30 blur-2xl lg:opacity-0"
            />
          </div>
          <SequenceField />
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:pl-8">
          {stages.map((stage, index) => (
            <div key={stage.key} className="flex items-end gap-5 lg:contents">
              {index > 0 ? (
                <span
                  data-arrow={stage.key}
                  aria-hidden
                  className="mb-3 hidden font-mono text-2xl text-[#B000B2] lg:inline"
                >
                  →
                </span>
              ) : null}
              <p
                data-word={stage.key}
                className="text-[clamp(40px,5.6vw,68px)] leading-none font-medium tracking-[-0.06em] lg:text-[clamp(32px,4.2vw,68px)]"
              >
                {stage.label}
              </p>
            </div>
          ))}
        </div>

        <p
          data-scroll-hint
          className="relative z-10 mt-8 hidden font-mono text-[10px] tracking-[0.22em] text-white/35 lg:block lg:pl-8"
        >
          SCROLL
        </p>
      </div>
    </section>
  );
}
