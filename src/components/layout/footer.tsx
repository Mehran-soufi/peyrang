import {
  BookOpen,
  Clapperboard,
  Info,
  LibraryBig,
  Mail,
  PenLine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BackToTop } from "@/components/layout/back-to-top";

const navigationLinks = [
  { label: "کتاب‌ها", icon: BookOpen },
  { label: "نویسندگان", icon: LibraryBig },
  { label: "اقتباس‌ها", icon: Clapperboard },
  { label: "درباره پی‌رنگ", icon: Info },
];

const contributionLinks = [
  { label: "معرفی کتاب", icon: BookOpen },
  { label: "نوشتن نقد", icon: PenLine },
  { label: "پیشنهاد کتاب", icon: LibraryBig },
];

const socialLinks = [
  { label: "GitHub", icon: Mail },
  { label: "Instagram", icon: Mail },
  { label: "تماس با ما", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden bg-muted/50 dark:bg-[oklch(0.15_0.015_45)]F">
      {/* Footer Top Edge */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-center">
        {/* Left Border */}
        <div className="h-px flex-1 bg-orange-500/20" />

        {/* Back to Top Notch */}
        <BackToTop />

        {/* Right Border */}
        <div className="h-px flex-1 bg-orange-500/20" />
      </div>

      {/* Decorative Glows */}
      <div
        aria-hidden="true"
        className="
          absolute -bottom-40 left-1/2
          size-96 -translate-x-1/2
          rounded-full
          bg-orange-500/10
          blur-[120px]
          dark:bg-orange-500/15
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute -top-32 right-1/4
          size-72
          rounded-full
          bg-orange-500/5
          blur-[100px]
          dark:bg-orange-500/10
        "
      />

      <div className=" relative mx-auto w-[95%] px-4 pt-14 pb-14 sm:px-6 sm:pt-16 sm:pb-16">
        {/* Main Footer */}
        <div
          className="
            grid gap-10
            sm:grid-cols-2
            lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]
            lg:gap-x-8
          "
        >
          {/* Brand + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pe-10">
            <div className="flex">
              <Link href="/" className="flex items-center gap-1">
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
            </div>

            <p className="mt-4 max-w-sm text-center text-sm leading-7 text-muted-foreground">
              پی‌رنگ، جایی برای کشف کتاب‌ها، نویسندگان و داستان‌هایی که
              می‌توانند بخشی از دنیای تو شوند.
            </p>

            <div
              className="
                mt-5 inline-flex items-center gap-2
                rounded-full
                border border-orange-500/15
                bg-orange-500/5
                px-3 py-1.5
                text-xs font-medium
                text-orange-600
                dark:text-orange-400
              "
            >
              <span className="size-1.5 rounded-full bg-orange-500" />
              از کتاب تا پرده
            </div>

            {/* Newsletter */}
            <div className="mt-8 max-w-md">
              <h3 className="text-sm font-bold">
                از جدیدترین‌های پی‌رنگ باخبر شوید
              </h3>

              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                کتاب‌های تازه، نقدهای جدید و اتفاقات مهم پی‌رنگ را از دست ندهید.
              </p>

              <form
                className="
                  mt-4 flex
                  overflow-hidden
                  rounded-xl
                  border border-border/60
                  bg-background/60
                  p-1
                  shadow-sm
                  backdrop-blur-sm
                  transition-colors
                  focus-within:border-orange-500/40
                  dark:bg-background/30
                "
              >
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  aria-label="آدرس ایمیل"
                  className="
                    min-w-0 flex-1
                    bg-transparent
                    px-3
                    text-xs
                    text-foreground
                    outline-none
                    placeholder:text-muted-foreground/70
                  "
                />

                <button
                  type="submit"
                  className="
                    shrink-0
                    rounded-lg
                    bg-orange-500
                    px-3.5 py-2
                    text-xs font-semibold
                    text-white
                    shadow-sm
                    transition-all duration-300
                    hover:bg-orange-400
                    hover:shadow-md
                    hover:shadow-orange-500/20
                  "
                >
                  عضویت
                </button>
              </form>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:pt-2">
            <h3 className="text-sm font-bold">پی‌رنگ</h3>

            <ul className="mt-4 space-y-3">
              {navigationLinks.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <button
                    type="button"
                    className="
                      group inline-flex items-center gap-2
                      text-sm text-muted-foreground
                      transition-colors
                      hover:text-orange-500
                    "
                  >
                    <Icon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contribution */}
          <div className="lg:pt-2">
            <h3 className="text-sm font-bold">مشارکت</h3>

            <ul className="mt-4 space-y-3">
              {contributionLinks.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <button
                    type="button"
                    className="
                      group inline-flex items-center gap-2
                      text-sm text-muted-foreground
                      transition-colors
                      hover:text-orange-500
                    "
                  >
                    <Icon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:pt-2">
            <h3 className="text-sm font-bold">ارتباط با ما</h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="
                    flex size-10 items-center justify-center
                    rounded-xl
                    border border-border/60
                    bg-background/60
                    text-muted-foreground
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    hover:border-orange-500/30
                    hover:bg-orange-500/5
                    hover:text-orange-500
                    dark:bg-background/30
                  "
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              پی‌رنگ با مشارکت خواننده‌ها ساخته می‌شود.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            mt-12
            flex flex-col gap-3
            border-t border-border/60
            pt-6
            text-xs text-muted-foreground
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p>© ۱۴۰۵ پی‌رنگ. تمامی حقوق محفوظ است.</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="transition-colors hover:text-orange-500"
            >
              حریم خصوصی
            </button>

            <button
              type="button"
              className="transition-colors hover:text-orange-500"
            >
              قوانین استفاده
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
