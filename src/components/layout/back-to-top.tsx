"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="بازگشت به بالای صفحه"
      onClick={handleClick}
      className="group relative z-20 flex h-7 w-14 shrink-0 items-center justify-center rounded-b-full
        bg-muted/50 text-orange-500 transition-all duration-300 hover:bg-orange-500 hover:text-white
        dark:bg-[oklch(0.15_0.015_45)] dark:hover:bg-orange-500 focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-orange-500 border border-orange-500/20 border-t-0
        cursor-pointer shadow-md shadow-orange-500/20"
    >
      <ArrowUp
        className="
          size-4
          transition-transform duration-300
          group-hover:-translate-y-0.5
        "
      />
    </button>
  );
}
