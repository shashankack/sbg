"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/animations";

export function CursorGlow() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    if (!fine || reducedMotion()) return;

    const glow = node.querySelector<HTMLElement>("[data-glow]");
    const ring = node.querySelector<HTMLElement>("[data-ring]");
    const dot = node.querySelector<HTMLElement>("[data-dot]");
    if (!glow || !ring || !dot) return;

    document.documentElement.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let glowX = x;
    let glowY = y;
    let ringX = x;
    let ringY = y;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      node.dataset.visible = "true";
    };

    const onOver = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      targetScale = target.closest("a, button, [data-cursor='hover']") ? 1.75 : 1;
    };

    const tick = () => {
      glowX += (x - glowX) * 0.075;
      glowY += (y - glowY) * 0.075;
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      scale += (targetScale - scale) * 0.14;
      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      data-visible="false"
      className="cursor-layer pointer-events-none fixed inset-0 z-[55] hidden lg:block"
    >
      <div data-glow className="cursor-glow" />
      <div data-ring className="cursor-ring" />
      <div data-dot className="cursor-dot" />
    </div>
  );
}
