"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { EASE, gsap, reducedMotion, ScrollTrigger, useGSAP } from "@/lib/animations";

const rows = [
  {
    index: "01",
    title: "BUILD",
    body: "Turn ideas into working prototypes.",
  },
  {
    index: "02",
    title: "BREAK",
    body: "Experiment, fail, debug and understand why.",
  },
  {
    index: "03",
    title: "SHIP",
    body: "Deploy real systems people can actually use.",
  },
];

export function BuildersSection() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-row]", root.current).forEach((row) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 96%",
              end: "top 84%",
              scrub: 0.35,
            },
          });

          timeline
            .from(row.querySelector("[data-num]"), { opacity: 0, duration: 0.35, ease: EASE.none })
            .from(
              row.querySelector("[data-title]"),
              { x: -30, duration: 0.5, ease: EASE.none },
              0.05,
            )
            .from(
              row.querySelector("[data-desc]"),
              { opacity: 0, duration: 0.4, ease: EASE.none },
              0.15,
            )
            .from(
              row.querySelector("[data-line]"),
              { scaleX: 0, transformOrigin: "left center", duration: 0.55, ease: EASE.none },
              0,
            );

          ScrollTrigger.create({
            trigger: row,
            start: "center 64%",
            end: "center 36%",
            onToggle: (self) => row.classList.toggle("is-focus", self.isActive),
          });
        });
      });

      motion.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        if (reducedMotion()) return;
        gsap.utils.toArray<HTMLElement>("[data-row]", root.current).forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 18,
            duration: 0.55,
            ease: EASE.out,
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
            },
          });
        });
      });

      return () => motion.revert();
    },
    { scope: root },
  );

  return (
    <section id="method" className="surface relative">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 lg:py-36">
        <p className="font-mono text-[11px] tracking-[0.22em] text-white/70">
          {"// 02 — METHOD"}
        </p>
        <p className="mt-5 font-mono text-[12px] tracking-[0.18em] text-white/75">
          WHAT WE ACTUALLY DO
        </p>
        <h2 className="mt-4 max-w-[12ch] text-[clamp(48px,6.5vw,92px)] leading-[0.88] font-medium tracking-[-0.055em]">
          LESS WATCHING.
          <br />
          MORE BUILDING.
        </h2>

        <div ref={root} className="mt-16 lg:mt-24">
          {rows.map((row) => (
            <article
              key={row.index}
              data-row
              className="builder-row group relative py-8 lg:py-11"
              onPointerMove={(event) => {
                if (event.pointerType !== "mouse") return;
                const bounds = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty(
                  "--px",
                  `${event.clientX - bounds.left}px`,
                );
                event.currentTarget.style.setProperty(
                  "--py",
                  `${event.clientY - bounds.top}px`,
                );
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px">
                <div data-line className="h-px w-full origin-left bg-white/15" />
                <div className="row-sweep" />
              </div>
              <div className="grid items-center gap-4 lg:grid-cols-[72px_minmax(0,0.7fr)_minmax(0,1fr)_auto] lg:gap-8">
                <span data-num className="font-mono text-sm tracking-[0.16em] text-white/35">
                  {row.index}
                </span>
                <div data-title>
                  <h3 className="text-[clamp(40px,5vw,72px)] leading-none font-medium tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-2">
                    {row.title}
                  </h3>
                </div>
                <p data-desc className="max-w-md text-base leading-relaxed text-muted">
                  {row.body}
                </p>
                <ArrowUpRight
                  aria-hidden
                  className="size-5 text-white/35 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#B000B2]"
                />
              </div>
            </article>
          ))}
          <div className="h-px origin-left bg-white/15" />
        </div>
      </div>
    </section>
  );
}
