import Link from "next/link";

type AuthTabsProps = {
  active: "login" | "register";
};

export function AuthTabs({ active }: AuthTabsProps) {
  return (
    <nav
      aria-label="احراز هویت"
      className="relative grid grid-cols-2 border-y border-border/50"
    >
      <Link
        href="/login"
        className={`
          group relative flex h-12 items-center justify-center
          text-sm font-semibold
          transition-colors duration-300
          ${
            active === "login"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }
        `}
      >
        ورود

        <span
          aria-hidden="true"
          className={`
            absolute inset-x-10 bottom-0 h-0.5 rounded-full
            bg-orange-500
            transition-all duration-300 ease-out
            ${
              active === "login"
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0"
            }
          `}
        />
      </Link>

      <Link
        href="/register"
        className={`
          group relative flex h-12 items-center justify-center
          text-sm font-semibold
          transition-colors duration-300
          ${
            active === "register"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }
        `}
      >
        ثبت‌نام

        <span
          aria-hidden="true"
          className={`
            absolute inset-x-10 bottom-0 h-0.5 rounded-full
            bg-orange-500
            transition-all duration-300 ease-out
            ${
              active === "register"
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0"
            }
          `}
        />
      </Link>
    </nav>
  );
}