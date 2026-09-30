"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type JoinDialogProps = {
  label?: string;
  className?: string;
  onOpenChange?: (open: boolean) => void;
};

export function JoinDialog({
  label = "Join SBG",
  className,
  onOpenChange,
}: JoinDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className={cn(className)} data-cursor="hover">
        {label}
        <ArrowUpRight className="size-4" aria-hidden />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <p className="font-mono text-[11px] tracking-[0.22em] text-white/50">
            {"// ACCESS"}
          </p>
          <DialogTitle>Join AWS SBG</DialogTitle>
          <DialogDescription>
            Membership details have not been published yet. When applications
            open, they will be posted here and through the community channels.
          </DialogDescription>
        </DialogHeader>
        <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-white/45">
          STATUS — DETAILS PENDING
        </p>
        <DialogClose asChild>
          <Button variant="outline" className="mt-6">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
