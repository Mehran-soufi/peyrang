"use client";

import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";

import { SearchTrigger } from "@/components/layout/search-trigger";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { signOut } from "@/features/auth/actions/sign-out";

type HeaderProps = {
  isAuthenticated: boolean;
  isHome: boolean;
  isScrolled: boolean;
};

export function Header({
  isAuthenticated,
  isHome,
  isScrolled,
}: HeaderProps) {
  const isTransparent = isHome && !isScrolled;
  const isSearchVisible = !isHome || isScrolled;

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out
        ${
          isTransparent
            ? "border-transparent bg-transparent"
            : "border-b border-primary/30 bg-background/80 opacity-95 shadow-sm shadow-black/3 backdrop-blur-2xl dark:shadow-black/10"
        }
      `}
    >
      <div className="mx-auto w-[95%] px-4 sm:px-6">
        {/* Desktop Header */}
        <div className="hidden h-18 items-center gap-3 sm:flex">
          {/* Logo */}
          <Link
            href="/"
            aria-label="پی‌رنگ"
            className="
              group flex shrink-0 items-center gap-2.5
              rounded-xl
              outline-none
              transition-opacity
              hover:opacity-85
              focus-visible:ring-2
              focus-visible:ring-primary/40
            "
          >
            <Image
              src="/assets/logo/logo.png"
              alt="پی رنگ"
              width={100}
              height={30}
            />
          </Link>

          {/* Search Area */}
          <div className="min-w-0 flex-1 px-3 lg:px-8">
            <div
              className={`
                w-full
                transition-all duration-300 ease-out
                ${
                  isSearchVisible
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }
              `}
            >
              <SearchTrigger />
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5">
            <ThemeSwitcher />

            <div className="h-6 w-px bg-border/60" />

            {isAuthenticated ? (
              <form action={signOut}>
                <button
                  type="submit"
                  className="
                    inline-flex h-10 items-center gap-2
                    rounded-xl
                    border border-border/70
                    bg-background/55
                    px-3.5
                    text-sm font-semibold
                    text-foreground
                    shadow-sm
                    backdrop-blur-sm
                    transition-all duration-200
                    hover:border-primary/25
                    hover:bg-primary/5
                    hover:text-primary
                    active:scale-[0.98]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary/30
                  "
                >
                  خروج
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="
                  inline-flex h-10 items-center gap-2
                  rounded-xl
                  border border-primary/25
                  bg-primary/10
                  px-3.5
                  text-sm font-bold
                  text-primary
                  shadow-sm shadow-primary/5
                  transition-all duration-200
                  hover:border-primary/35
                  hover:bg-primary/15
                  hover:shadow-md
                  hover:shadow-primary/10
                  active:scale-[0.98]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary/30
                "
              >
                <LogIn className="size-4" />

                <span>
                  ورود
                  <span className="mx-1.5 opacity-40">|</span>
                  ثبت‌نام
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex h-14 items-center justify-between sm:hidden">
          <Link
            href="/"
            aria-label="پی‌رنگ"
            className="
              group flex items-center gap-2 rounded-xl
              outline-none transition-opacity
              hover:opacity-85
              focus-visible:ring-2
              focus-visible:ring-primary/40
            "
          >
            <Image
              src="/assets/logo/logo.png"
              alt="پی رنگ"
              width={75}
              height={30}
            />
          </Link>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
