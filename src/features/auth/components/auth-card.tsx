import Image from "next/image";
import Link from "next/link";

import { AuthTabs } from "@/features/auth/components/auth-tabs";

type AuthCardProps = {
  active?: "login" | "register";
  children: React.ReactNode;
};

export function AuthCard({ active, children }: AuthCardProps) {
  return (
    <section className="relative w-full max-w-md">
      {/* Ambient book atmosphere */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -inset-8 -z-10
          rounded-[3rem]
          bg-orange-500/8
          blur-3xl
          dark:bg-orange-500/6
        "
      />

      <div
        className="
          relative overflow-hidden
          rounded-3xl
          border border-border/60
          bg-background/95
          shadow-2xl shadow-black/8
          backdrop-blur-xl
          dark:bg-card/90
          dark:shadow-black/30
        "
      >
        {/* Subtle page texture */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.06),transparent_42%)]
            dark:bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_42%)]
          "
        />

        {/* Page edge */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-y-6 right-0 w-px
            bg-linear-to-b
            from-transparent
            via-orange-500/20
            to-transparent
          "
        />

        <div className="relative">
          {/* Brand */}
          <div className="flex flex-col items-center px-6 pb-5 pt-7">
            <Link
              href="/"
              aria-label="بازگشت به صفحه اصلی پی‌رنگ"
              className="
                flex items-center gap-1
                transition-transform duration-300
                hover:scale-[1.02]
              "
            >
              <Image
                src="/assets/logo/logo.png"
                alt="لوگو پی‌رنگ"
                width={90}
                height={60}
                loading="lazy"
              />

              <Image
                src="/assets/icon/payrang-icon.png"
                alt="آیکون پی‌رنگ"
                width={30}
                height={30}
                loading="lazy"
              />
            </Link>

            <p className="mt-1 text-xs text-muted-foreground">
              جایی برای قصه‌هایی که ماندگار می‌شوند
            </p>
          </div>

          {/* Auth tabs */}
          <AuthTabs active={active} />

          {/* Form */}
          <div className="relative px-6 pb-7 pt-6 sm:px-7 sm:pb-8">
            {/* Page line */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-x-10 top-0 h-px
                bg-linear-to-r
                from-transparent
                via-orange-500/20
                to-transparent
              "
            />

            {children}
          </div>

          {/* Bottom page detail */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-10 bottom-0 h-px
              bg-linear-to-r
              from-transparent
              via-orange-500/20
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}
