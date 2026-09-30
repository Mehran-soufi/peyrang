"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  {
    value: "dark",
    label: "تیره",
    icon: Moon,
  },
  {
    value: "system",
    label: "سیستم",
    icon: Laptop,
  },
  {
    value: "light",
    label: "روشن",
    icon: Sun,
  },
] as const;

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-26 rounded-lg" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  const handleMobileToggle = () => {
    if (theme === "system") {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    setTheme("system");
  };

  const desktopIndicatorPosition =
    theme === "dark"
      ? "translate-x-0"
      : theme === "system"
        ? "translate-x-8"
        : "translate-x-16";

  const mobileIndicatorPosition = isDark
    ? "translate-x-0"
    : "translate-x-7";

  return (
    <div className="flex items-center">
      {/* Desktop */}
      <div
        className="relative hidden h-9 w-26 rounded-lg border bg-muted/50 p-1 sm:flex"
        dir="ltr"
        role="radiogroup"
        aria-label="انتخاب حالت نمایش"
      >
        <div
          className={`absolute left-1 top-1 h-7 w-8 rounded-md bg-background shadow-sm transition-transform duration-300 ease-out ${desktopIndicatorPosition}`}
          aria-hidden="true"
        />

        {themes.map(({ value, label, icon: Icon }) => {
          const active = theme === value;

          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={label}
              onClick={() => setTheme(value)}
              className={`relative z-10 flex h-7 w-8 items-center justify-center rounded-md transition-colors duration-200 ${
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
            </button>
          );
        })}
      </div>

      {/* Mobile */}
      <button
        type="button"
        dir="ltr"
        onClick={handleMobileToggle}
        aria-label={
          theme === "system"
            ? `حالت سیستم؛ تغییر به ${isDark ? "روشن" : "تیره"}`
            : `حالت ${theme === "dark" ? "تیره" : "روشن"}؛ بازگشت به حالت سیستم`
        }
        className="relative flex h-9 w-16 items-center rounded-full border bg-muted/50 p-1 transition-colors duration-300 sm:hidden"
      >
        <span
          className={`flex size-7 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-300 ease-out ${mobileIndicatorPosition}`}
        >
          {isDark ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </span>
      </button>
    </div>
  );
}