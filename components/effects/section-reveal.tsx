"use client";

import { useRef, type ReactNode } from "react";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/animations";
import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function SectionReveal({ children, className, y = 16 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 0.7,
        ease: EASE.out,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
