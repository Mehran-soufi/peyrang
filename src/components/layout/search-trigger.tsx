"use client";

import { Search } from "lucide-react";

import { SearchDialog } from "@/features/search/components/search-dialog";

export function SearchTrigger() {
  return (
    <SearchDialog
      trigger={
        <button
          type="button"
          className="
            flex
            h-11
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-border/60
            bg-background/65
            px-3.5
            text-sm
            text-muted-foreground
            shadow-sm
            backdrop-blur-sm
            transition-all
            hover:border-primary/30
            hover:bg-background
            hover:text-foreground
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary/30
            sm:h-10
            sm:w-64
            sm:px-3
            lg:w-72
          "
        >
          <Search className="size-4 shrink-0" />

          <span className="truncate">
            جستجوی کتاب، نویسنده...
          </span>
        </button>
      }
    />
  );
}