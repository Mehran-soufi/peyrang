"use client";

import Link from "next/link";
import {
  BookOpen,
  Clapperboard,
  Home,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navigationItems = [
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
    href: "/authors",
    label: "نویسندگان",
    icon: UserRound,
  },
  {
    href: "/adaptations",
    label: "اقتباس‌ها",
    icon: Clapperboard,
  },
];

type SiteNavigationProps = {
  isHome: boolean;
  isScrolled: boolean;
  isVisible: boolean;
};

export function SiteNavigation({
  isHome,
  isScrolled,
  isVisible,
}: SiteNavigationProps) {
  const pathname = usePathname();

  const shouldShow = !isHome || (isScrolled && isVisible);

  return (
    <nav
      aria-label="ناوبری اصلی سایت"
      className={`
        fixed inset-x-0 top-18 z-40
        hidden sm:block
        transition-all duration-300 ease-out
        ${
          shouldShow
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }
      `}
    >
      <div
        className="
          border-b border-border/40
          bg-background/65
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto flex h-11 w-full max-w-7xl
            items-center justify-center
            px-4 sm:px-6
          "
        >
          <div className="flex items-center gap-1">
            {navigationItems.map(
              ({ href, label, icon: Icon }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={
                      isActive ? "page" : undefined
                    }
                    className={`
                      group relative
                      flex h-9 items-center gap-2
                      rounded-lg
                      px-4
                      text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        size-4 transition-transform duration-200
                        ${
                          isActive
                            ? "text-primary"
                            : "group-hover:-translate-y-px"
                        }
                      `}
                    />

                    <span>{label}</span>

                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="
                          absolute inset-x-3 -bottom-px
                          h-0.5
                          rounded-full
                          bg-primary
                          shadow-sm shadow-primary/30
                        "
                      />
                    )}
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}