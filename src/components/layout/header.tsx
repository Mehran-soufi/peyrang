
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { SearchTrigger } from "@/components/layout/search-trigger";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { signOut } from "@/features/auth/actions/sign-out";

type AccountInfo = {
  displayName: string;
  username: string | null;
  role: string | null;
};

type HeaderProps = {
  isAuthenticated: boolean;
  account: AccountInfo | null;
  accountPending?: boolean;
  isHome: boolean;
  isScrolled: boolean;
};

const menuItemClass =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

export function Header({
  isAuthenticated,
  account,
  accountPending = false,
  isHome,
  isScrolled,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isTransparent = isHome && !isScrolled;
  const isSearchVisible = !isHome || isScrolled;

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

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
            className="group flex shrink-0 items-center gap-2.5 rounded-xl outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary/40"
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
                w-full transition-all duration-300 ease-out
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

            {accountPending ? (
              <div
                aria-label="در حال بارگذاری حساب کاربری"
                className="h-10 w-36 animate-pulse rounded-xl bg-muted/70"
              />
            ) : isAuthenticated ? (
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="
                    inline-flex h-10 max-w-56 items-center gap-2
                    rounded-xl border border-border/70
                    bg-background/55 px-3
                    text-sm font-semibold text-foreground
                    shadow-sm backdrop-blur-sm
                    transition-all duration-200
                    hover:border-primary/25 hover:bg-primary/5
                    hover:text-primary active:scale-[0.98]
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-primary/30
                  "
                >
                  <UserRound className="size-4 shrink-0" />

                  <span className="truncate">
                    {account?.displayName ?? "حساب کاربری"}
                  </span>

                  <ChevronDown
                    className={`size-4 shrink-0 transition-transform ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMenuOpen && (
                  <div
                    role="menu"
                    className="
                      absolute inset-e-0 top-full z-50 mt-2 w-64
                      overflow-hidden rounded-2xl
                      border border-border/70
                      bg-background/95 p-2
                      shadow-xl shadow-black/10 backdrop-blur-2xl
                      animate-in fade-in-0 zoom-in-95
                    "
                  >
                    <div className="border-b border-border/60 px-3 py-3">
                      <p className="truncate text-sm font-bold text-foreground">
                        {account?.displayName ?? "حساب کاربری"}
                      </p>

                      {account?.username && (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          @{account.username}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 py-2">
                      <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setIsMenuOpen(false)}
                        className={menuItemClass}
                      >
                        <UserRound className="size-4" />
                        <span>پروفایل من</span>
                      </Link>

                      <Link
                        href="/profile#favorites"
                        role="menuitem"
                        onClick={() => setIsMenuOpen(false)}
                        className={menuItemClass}
                      >
                        <Heart className="size-4" />
                        <span>کتاب‌های موردعلاقه</span>
                      </Link>

                      {account?.role === "admin" && (
                        <Link
                          href="/admin"
                          role="menuitem"
                          onClick={() => setIsMenuOpen(false)}
                          className={menuItemClass}
                        >
                          <ShieldCheck className="size-4" />
                          <span>پنل مدیریت</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-border/60 pt-2">
                      <form action={signOut}>
                        <button
                          type="submit"
                          role="menuitem"
                          className={`
                            ${menuItemClass}
                            text-destructive hover:bg-destructive/8
                            hover:text-destructive
                          `}
                        >
                          <LogOut className="size-4" />
                          <span>خروج از حساب</span>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="
                  inline-flex h-10 items-center gap-2
                  rounded-xl border border-primary/25
                  bg-primary/10 px-3.5
                  text-sm font-bold text-primary
                  shadow-sm shadow-primary/5
                  transition-all duration-200
                  hover:border-primary/35 hover:bg-primary/15
                  hover:shadow-md hover:shadow-primary/10
                  active:scale-[0.98]
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-primary/30
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

        {/* Mobile Header — unchanged */}
        <div className="flex h-14 items-center justify-between sm:hidden">
          <Link
            href="/"
            aria-label="پی‌رنگ"
            className="group flex items-center gap-2 rounded-xl outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary/40"
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
