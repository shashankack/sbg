"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { connectLinks } from "@/lib/site";

export function ConnectList() {
  return (
    <TooltipProvider>
      <ul className="mt-4 flex flex-col items-start gap-2.5">
        {connectLinks.map((item) => (
          <li key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="footer-link text-left text-white/80">
                  {item.label}
                </button>
              </TooltipTrigger>
              <TooltipContent>Link coming soon</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
