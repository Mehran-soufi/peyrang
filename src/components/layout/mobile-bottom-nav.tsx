"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Search, UserRound } from "lucide-react";

import { SearchDialog } from "@/features/search/components/search-dialog";
import { CategoriesSheet } from "@/features/categories/components/categories-sheet";

type MobileBottomNavProps = {
  isAuthenticated: boolean;
};

export function MobileBottomNav({ isAuthenticated }: MobileBottomNavProps) {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isProfileActive = isAuthenticated && pathname.startsWith("/profile");

  return (
    <nav
      aria-label="ناوبری اصلی موبایل"
      className="
        fixed inset-x-0 bottom-0 z-50
        px-4 pb-[max(1rem,env(safe-area-inset-bottom))]
        sm:hidden
      "
    >
      <div
        className="
          mx-auto flex h-16 max-w-md items-center
          rounded-2xl
          border
          bg-background/80
          p-1.5
          shadow-lg shadow-black/5
          backdrop-blur-xl
          dark:shadow-black/20
        "
      >
        <Link
          href="/"
          aria-current={isHomeActive ? "page" : undefined}
          className={`
            flex h-full min-w-0 flex-1 flex-col
            items-center justify-center gap-0.5
            rounded-xl
            text-[11px] font-medium
            transition-all duration-200
            ${
              isHomeActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            }
          `}
        >
          <Home className="size-5" />

          <span>خانه</span>
        </Link>

        <SearchDialog
          trigger={
            <button
              type="button"
              className="
                flex h-full min-w-0 flex-1 flex-col
                items-center justify-center gap-0.5
                rounded-xl
                text-[11px] font-medium
                text-muted-foreground
                transition-all duration-200
                hover:bg-muted/70
                hover:text-foreground
              "
            >
              <Search className="size-5" />

              <span>جستجو</span>
            </button>
          }
        />

        <CategoriesSheet
          trigger={
            <button
              type="button"
              className="
                flex h-full min-w-0 flex-1 flex-col
                items-center justify-center gap-0.5
                rounded-xl
                text-[11px] font-medium
                text-muted-foreground
                transition-all duration-200
                hover:bg-muted/70
                hover:text-foreground
              "
            >
              <BookOpen className="size-5" />

              <span>دسته‌بندی</span>
            </button>
          }
        />

        <Link
          href={isAuthenticated ? "/profile" : "/login"}
          aria-current={isProfileActive ? "page" : undefined}
          className={`
            flex h-full min-w-0 flex-1 flex-col
            items-center justify-center gap-0.5
            rounded-xl
            text-[11px] font-medium
            transition-all duration-200
            ${
              isProfileActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            }
          `}
        >
          <UserRound className="size-5" />

          <span>{isAuthenticated ? "پروفایل" : "ورود | ثبت‌نام"}</span>
        </Link>
      </div>
    </nav>
  );
}
