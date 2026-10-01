import Link from "next/link";
import { BookOpen } from "lucide-react";

import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { SearchTrigger } from "@/components/layout/search-trigger";
import { signOut } from "@/features/auth/actions/sign-out";

type HeaderProps = {
  isAuthenticated: boolean;
};

const navigationItems = [
  {
    href: "/",
    label: "خانه",
  },
  {
    href: "/books",
    label: "کتاب‌ها",
  },
  {
    href: "/authors",
    label: "نویسندگان",
  },
  {
    href: "/adaptations",
    label: "اقتباس‌ها",
  },
];

export async function Header({ isAuthenticated }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-border/60
        bg-background/75
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto flex h-16 w-full max-w-7xl
          items-center gap-6
          px-4 sm:px-6
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            flex shrink-0 items-center gap-2
            text-lg font-bold
            tracking-tight
            transition-opacity
            hover:opacity-80
          "
          aria-label="پی‌رنگ"
        >
          <span
            aria-hidden="true"
            className="
              flex size-9 items-center justify-center
              rounded-xl
              border border-primary/20
              bg-primary/10
              text-primary
            "
          >
            <BookOpen className="size-5" />
          </span>

          <span>پی‌رنگ</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="ناوبری اصلی"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigationItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="
                rounded-lg px-3 py-2
                text-sm font-medium
                text-muted-foreground
                transition-colors
                hover:bg-muted/70
                hover:text-foreground
              "
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <SearchTrigger />

        {/* Theme */}
        <ThemeSwitcher />

        {/* Authentication */}
        <div className="hidden items-center gap-2 sm:flex">
          {isAuthenticated ? (
            <form action={signOut}>
              <button
                type="submit"
                className="
                  rounded-xl border
                  px-3.5 py-2
                  text-sm font-medium
                  transition-colors
                  hover:bg-muted
                "
              >
                خروج
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/login"
                className="
                  rounded-xl px-3.5 py-2
                  text-sm font-medium
                  text-muted-foreground
                  transition-colors
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                ورود
              </Link>

              <Link
                href="/register"
                className="
                  rounded-xl
                  bg-primary
                  px-4 py-2
                  text-sm font-medium
                  text-primary-foreground
                  shadow-sm
                  transition-all
                  hover:opacity-90
                  hover:shadow-md
                "
              >
                ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
