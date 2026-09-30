"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JoinDialog } from "@/components/layout/join-dialog";
import { Logo } from "@/components/layout/logo";
import { EASE, gsap, reducedMotion, ScrollTrigger, useGSAP } from "@/lib/animations";
import { navLinks } from "@/lib/site";

export function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const shell = nav.current;
      if (!shell) return;

      if (!reducedMotion()) {
        gsap.from(shell, {
          y: -28,
          opacity: 0,
          duration: 0.85,
          delay: pathname === "/" ? 1.15 : 0,
          ease: EASE.cinematic,
        });
      }

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          shell.classList.toggle("is-scrolled", self.scroll() > 28);
        },
      });
    },
    { scope: nav },
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 hidden justify-center px-4 lg:flex xl:top-7">
      <nav
        ref={nav}
        aria-label="Primary"
        className="nav-shell pointer-events-auto flex items-center justify-between gap-8 px-6 py-3.5 xl:px-8"
      >
        <Logo />
        <ul className="flex items-center gap-7">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-active={active}
                  className="nav-link"
                  onMouseEnter={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const origin =
                      event.clientX < rect.left + rect.width / 2
                        ? "left center"
                        : "right center";
                    event.currentTarget.style.setProperty("--nav-origin", origin);
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <JoinDialog label="Join SBG" className="cta-luminous shrink-0" />
      </nav>
    </div>
  );
}
