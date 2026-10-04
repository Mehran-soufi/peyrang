"use client";

import { Search } from "lucide-react";

import { SearchDialog } from "@/features/search/components/search-dialog";

export function SearchTrigger() {
  return (
    <SearchDialog
      trigger={
        <button
          type="button"
          className="flex h-11 w-full items-center gap-3 rounded-xl border border-border/70
           bg-background/75 px-3.5 text-sm text-muted-foreground shadow-sm backdrop-blur-sm transition-all
           hover:border-primary/40 hover:bg-background hover:text-foregroun 
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
           dark:border-border dark:bg-background/50 dark:hover:border-primary/40 dark:hover:bg-background/70
           sm:h-11 sm:w-70 sm:px-3 lg:w-75 xl:w-90"
        >
          <Search className="size-4 shrink-0" />

          <span className="truncate">جستجوی کتاب، نویسنده...</span>
        </button>
      }
    />
  );
}
