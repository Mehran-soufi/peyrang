"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Search, UserRound } from "lucide-react";

import { SearchDialog } from "@/features/search/components/search-dialog";

type MobileBottomNavProps = {
  isAuthenticated: boolean;
};

export function MobileBottomNav({ isAuthenticated }: MobileBottomNavProps) {
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      label: "خانه",
      icon: Home,
    },
    {
      href: "/books",
      label: "کتاب‌ها",
      icon: BookOpen,
    },
    {
      href: isAuthenticated ? "/profile" : "/login",
      label: isAuthenticated ? "پروفایل" : "ورود",
      icon: UserRound,
    },
  ];

  return (
    <nav
      aria-label="ناوبری اصلی"
      className="
        fixed inset-x-0 bottom-0 z-50
        px-4 pb-[max(1rem,env(safe-area-inset-bottom))]
        sm:hidden
      "
    >
      <div
        className="
          mx-auto flex h-16 max-w-md items-center justify-around
          rounded-2xl border
          bg-background/80
          p-1.5
          shadow-lg shadow-black/5
          backdrop-blur-xl
          dark:shadow-black/20
        "
      >
        {items.slice(0, 2).map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex h-full min-w-16 flex-1 flex-col
                items-center justify-center gap-0.5
                rounded-xl
                text-xs font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }
              `}
            >
              <Icon
                className={`size-5 transition-transform duration-200 ${
                  isActive ? "scale-105" : ""
                }`}
              />

              <span>{label}</span>
            </Link>
          );
        })}

        <SearchDialog
          trigger={
            <button
              type="button"
              className="
                flex h-full min-w-16 flex-1 flex-col
                items-center justify-center gap-0.5
                rounded-xl
                text-xs font-medium
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

        {(() => {
          const href = isAuthenticated ? "/profile" : "/login";
          const label = isAuthenticated ? "پروفایل" : "ورود";
          const Icon = UserRound;

          const isActive = pathname.startsWith(href);

          return (
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex h-full min-w-16 flex-1 flex-col
                items-center justify-center gap-0.5
                rounded-xl
                text-xs font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }
              `}
            >
              <Icon
                className={`size-5 transition-transform duration-200 ${
                  isActive ? "scale-105" : ""
                }`}
              />

              <span>{label}</span>
            </Link>
          );
        })()}
      </div>
    </nav>
  );
}
