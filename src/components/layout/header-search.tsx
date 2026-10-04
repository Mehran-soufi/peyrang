"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function HeaderSearch() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";
  const isVisible = !isHome || isScrolled;

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <div
      className={`
        hidden overflow-hidden transition-all duration-300 ease-out lg:block
        ${isVisible ? "w-64 opacity-100" : "pointer-events-none w-0 opacity-0"}
      `}
    >
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="search"
          placeholder="جستجوی کتاب، نویسنده..."
          aria-label="جستجو"
          className="
            h-10 w-full rounded-xl border
            bg-background/60
            pr-10 pl-4
            text-sm
            outline-none
            transition-colors
            placeholder:text-muted-foreground
            focus:border-primary
            focus:ring-2
            focus:ring-primary/15
          "
        />
      </div>
    </div>
  );
}
