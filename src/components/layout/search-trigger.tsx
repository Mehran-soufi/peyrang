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
            hidden
            h-10
            w-64
            items-center
            gap-2
            rounded-xl
            border
            border-border/60
            bg-background/60
            px-3
            text-sm
            text-muted-foreground
            backdrop-blur-sm
            transition-all
            hover:border-primary/30
            hover:bg-background
            hover:text-foreground
            lg:flex
          "
        >
          <Search className="size-4 shrink-0" />

          <span>جستجوی کتاب، نویسنده...</span>
        </button>
      }
    />
  );
}
