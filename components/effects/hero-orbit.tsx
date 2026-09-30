"use client";

import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "@/lib/animations";

function ticks(count: number, inner: number, outer: number) {
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    return {
      x1: round(50 + Math.cos(angle) * inner),
      y1: round(50 + Math.sin(angle) * inner),
      x2: round(50 + Math.cos(angle) * outer),
      y2: round(50 + Math.sin(angle) * outer),
    };
  });
}

const outerTicks = ticks(28, 46.2, 49);
const midTicks = ticks(16, 45.5, 48.5);

export function HeroOrbit() {
  const root = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
      if (!fine || reducedMotion() || !tilt.current || !root.current) return;

      const rotateX = gsap.quickTo(tilt.current, "rotationX", {
        duration: 0.7,
        ease: "power3.out",
      });
      const rotateY = gsap.quickTo(tilt.current, "rotationY", {
        duration: 0.7,
        ease: "power3.out",
      });

      const onMove = (event: PointerEvent) => {
        const bounds = root.current?.getBoundingClientRect();
        if (!bounds) return;
        const inside =
          event.clientX >= bounds.left &&
          event.clientX <= bounds.right &&
          event.clientY >= bounds.top &&
          event.clientY <= bounds.bottom;

        if (!inside) {
          rotateX(0);
          rotateY(0);
          return;
        }

        const px = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
        const py = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
        rotateY(gsap.utils.clamp(-5, 5, px * 10));
        rotateX(gsap.utils.clamp(-5, 5, py * -10));
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-hero-scroll
      aria-hidden
      className="relative z-[2] mx-auto aspect-square w-[min(88vw,420px)] lg:absolute lg:top-1/2 lg:right-[4%] lg:mx-0 lg:w-[min(44vw,620px)] lg:-translate-y-1/2"
    >
      <div data-hero-visual className="h-full w-full [perspective:1100px]">
        <div className="orbit-float h-full w-full">
          <div
            ref={tilt}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            <div
              data-hero-haze
              className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(176,0,178,0.42),rgba(147,0,156,0.18)_34%,rgba(56,3,86,0.12)_52%,transparent_70%)] blur-2xl"
            />
            <div className="absolute inset-[10%] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-50 [mask-image:radial-gradient(circle,black,transparent_72%)]" />

            <svg viewBox="0 0 100 100" className="absolute inset-[12%] h-[76%] w-[76%] text-[#6B0078]">
              <line x1="18" y1="62" x2="38" y2="30" stroke="currentColor" strokeWidth="0.25" />
              <line x1="38" y1="30" x2="70" y2="42" stroke="currentColor" strokeWidth="0.25" />
              <line x1="50" y1="50" x2="78" y2="22" stroke="#93009C" strokeWidth="0.25" />
              <line x1="50" y1="50" x2="24" y2="74" stroke="#93009C" strokeWidth="0.25" />
              <rect x="17" y="60" width="2.2" height="2.2" fill="#B000B2" />
              <rect x="68.6" y="40.6" width="2.2" height="2.2" fill="#ffffff" opacity="0.8" />
              <rect x="76.5" y="20.4" width="1.8" height="1.8" fill="#93009C" />
            </svg>

            <div data-orbit-rings className="absolute inset-0">
              <div className="orbit-cw absolute inset-[2%] text-[#6B0078]">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.35" opacity="0.85" />
                  {outerTicks.map((tick) => (
                    <line key={`${tick.x1}-${tick.y1}`} {...tick} stroke="currentColor" strokeWidth="0.35" />
                  ))}
                </svg>
                <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 bg-[#B000B2]" />
                <span className="orbit-extra absolute bottom-[18%] left-[4%] hidden size-2 border border-[#93009C] sm:block" />
              </div>

              <div className="orbit-ccw absolute inset-[16%] text-[#93009C]">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="47"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.4"
                    strokeDasharray="1.4 2.2"
                  />
                  {midTicks.map((tick) => (
                    <line key={`${tick.x2}-${tick.y2}`} {...tick} stroke="currentColor" strokeWidth="0.4" />
                  ))}
                </svg>
                <span className="absolute top-[8%] right-[10%] size-1.5 bg-white" />
                <span className="absolute bottom-[6%] left-1/2 size-2 -translate-x-1/2 border border-white/80" />
              </div>

              <div className="orbit-signal absolute inset-[29%]">
                <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#B000B2]" />
              </div>

              <div className="absolute inset-[30%] rounded-full border border-[#B000B2]/35" />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="core-breathe relative size-24 sm:size-28">
                <div className="absolute inset-0 border border-white/75" />
                <div className="absolute inset-[14%] rotate-45 border border-[#B000B2]/80" />
                <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 bg-[#B000B2] shadow-[0_0_18px_#B000B2]" />
              </div>
            </div>

            <span className="absolute top-[8%] right-[2%] hidden font-mono text-[10px] tracking-[0.2em] text-white/45 md:block">
              NODE / BLR
            </span>
            <span className="absolute bottom-[14%] left-0 hidden font-mono text-[10px] tracking-[0.2em] text-white/35 md:block">
              CORE 01
            </span>
            <span className="orbit-extra absolute top-[46%] right-[-2%] hidden h-px w-10 bg-[#93009C]/70 lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
