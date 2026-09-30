"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JoinDialog } from "@/components/layout/join-dialog";
import { Logo } from "@/components/layout/logo";
import { EASE, gsap, reducedMotion, useGSAP } from "@/lib/animations";
import { navLinks } from "@/lib/site";

export function MobileNavbar() {
  const root = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [rendered, setRendered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  const closeMenu = useCallback(() => {
    setExpanded(false);
    if (reducedMotion() || !timeline.current) {
      setRendered(false);
      buttonRef.current?.focus();
      return;
    }
    timeline.current.reverse();
    buttonRef.current?.focus();
  }, []);

  useGSAP(
    () => {
      if (!rendered || reducedMotion()) return;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: EASE.out },
        onReverseComplete: () => setRendered(false),
      });

      tl.fromTo("[data-menu-scrim]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.05)
        .fromTo(
          "[data-menu-panel]",
          { yPercent: -100 },
          { yPercent: 0, duration: 0.55 },
          0,
        )
        .fromTo(
          "[data-menu-item]",
          { y: 30 },
          { y: 0, duration: 0.48, stagger: 0.07 },
          0.28,
        )
        .fromTo(
          "[data-menu-label]",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.07 },
          0.28,
        )
        .fromTo(
          "[data-menu-index]",
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.07 },
          0.4,
        )
        .fromTo(
          "[data-menu-cta]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.58,
        );

      timeline.current = tl;
      tl.play();
    },
    { scope: root, dependencies: [rendered], revertOnUpdate: true },
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      timeline.current = null;
      setExpanded(false);
      setRendered(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!rendered) return;
    const content = document.getElementById("page-content");
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    content?.setAttribute("inert", "");

    const dialog = root.current?.querySelector<HTMLElement>("[data-menu-dialog]");
    const getItems = () =>
      Array.from(
        root.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ??
          [],
      );

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const items = getItems();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    dialog?.querySelector<HTMLElement>("[data-menu-label]")?.parentElement?.focus();

    return () => {
      document.body.style.overflow = previous;
      content?.removeAttribute("inert");
      document.removeEventListener("keydown", onKey);
    };
  }, [rendered, closeMenu]);

  const openMenu = () => {
    setExpanded(true);
    setRendered(true);
  };

  return (
    <div ref={root} className="lg:hidden">
      <div
        className={`fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 transition-colors duration-300 ${
          expanded || scrolled ? "bg-[#241030]/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <Logo />
        <button
          ref={buttonRef}
          type="button"
          className="font-mono text-[12px] tracking-[0.22em] text-white"
          aria-expanded={expanded}
          aria-controls="mobile-menu"
          onClick={() => (expanded ? closeMenu() : openMenu())}
        >
          {expanded ? "CLOSE" : "MENU"}
        </button>
      </div>

      {rendered ? (
        <div
          id="mobile-menu"
          data-menu-dialog
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] overflow-hidden"
        >
          <div data-menu-scrim className="surface absolute inset-0" />
          <div
            data-menu-panel
            className="relative flex h-full flex-col justify-between px-6 pt-28 pb-10"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href} data-menu-item>
                  <Link
                    href={link.href}
                    className="flex items-baseline gap-4"
                    onClick={closeMenu}
                  >
                    <span
                      data-menu-index
                      className="font-mono text-sm tracking-[0.18em] text-white/40"
                    >
                      {link.index}
                    </span>
                    <span
                      data-menu-label
                      className="text-[clamp(40px,12vw,68px)] leading-none tracking-[-0.05em]"
                    >
                      {link.label.toUpperCase()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div data-menu-cta>
              <JoinDialog
                label="Join SBG"
                className="cta-luminous"
                onOpenChange={(open) => {
                  if (open) closeMenu();
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
