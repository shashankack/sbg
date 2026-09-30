import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3 text-white", className)}
      aria-label="AWS SBG home"
    >
      <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden>
        <rect x="1" y="13" width="7" height="7" fill="currentColor" />
        <rect x="10" y="4" width="7" height="7" fill="#B000B2" />
        <rect x="10" y="13" width="7" height="7" fill="currentColor" />
        <rect x="19" y="8" width="7" height="7" fill="currentColor" opacity="0.82" />
        <rect x="19" y="17" width="7" height="7" fill="#93009C" />
        <rect x="28" y="13" width="3" height="3" fill="currentColor" opacity="0.5" />
      </svg>
      <span className="text-[13px] font-medium tracking-[0.22em]">AWS SBG</span>
    </Link>
  );
}
