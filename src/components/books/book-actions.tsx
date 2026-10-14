"use client";

import {  PenLine, Plus } from "lucide-react";

export function BookActions() {
  return (
    <div
      className="
        mt-8
        flex flex-wrap
        items-center
        gap-2.5
        border-y border-border/50
        py-4
      "
    >
      <button
        type="button"
        className="cursor-pointer
          inline-flex h-11 items-center gap-2
          rounded-xl
          bg-orange-500
          px-4
          text-sm font-bold text-white
          shadow-lg shadow-orange-500/20
          transition-all duration-300
          hover:bg-orange-400
          hover:shadow-orange-500/30
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-orange-500
          focus-visible:ring-offset-2
        "
      >
        <Plus className="size-4" />
        <span>تغییر در اطلاعات</span>
      </button>
      <button
        type="button"
        className="cursor-pointer
          inline-flex h-11 items-center gap-2
          rounded-xl
          border border-border/70
          bg-background/40
          px-4
          text-sm font-semibold
          text-muted-foreground
          backdrop-blur-md
          transition-all duration-300
          hover:border-orange-500/40
          hover:bg-orange-500/10
          hover:text-orange-500
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-orange-500
          focus-visible:ring-offset-2
        "
      >
        <PenLine className="size-4" />
        <span>نوشتن نقد</span>
      </button>
    </div>
  );
}