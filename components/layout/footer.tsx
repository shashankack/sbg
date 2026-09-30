import Link from "next/link";
import { ConnectList } from "@/components/layout/connect-list";
import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 bg-black">
      <Separator className="bg-white/20" />
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-10 md:px-10 md:pt-24">
        <p className="text-[clamp(48px,8vw,112px)] leading-[0.84] font-medium tracking-[-0.055em]">
          AWS
          <span className="mt-1 block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.88)]">
            STUDENT BUILDERS
          </span>
          GROUP
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.22em] text-white/40">
              NAVIGATION
            </h2>
            <ul className="mt-4 flex flex-col items-start gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link text-white/80">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.22em] text-white/40">
              CONNECT
            </h2>
            <ConnectList />
          </div>
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.22em] text-white/40">
              LOCATION
            </h2>
            <p className="mt-4 text-white/80">Bengaluru</p>
            <p className="text-white/80">India</p>
          </div>
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.22em] text-white/40">
              STATUS
            </h2>
            <p className="mt-4 inline-flex items-center gap-2.5 text-white/80">
              <span className="status-dot" aria-hidden />
              BUILDERS ONLINE
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] tracking-[0.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AWS STUDENT BUILDERS GROUP</p>
          <p>Built by builders.</p>
        </div>
      </div>
    </footer>
  );
}
