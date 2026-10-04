import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  Clapperboard,
  LibraryBig,
  NotebookPen,
  Search,
  Sparkles,
} from "lucide-react";

import { SearchDialog } from "@/features/search/components/search-dialog";

const quickFilters = [
  {
    label: "کتاب‌های محبوب",
    icon: Sparkles,
  },
  {
    label: "تازه‌های پی‌رنگ",
    icon: BookOpen,
  },
  {
    label: "اقتباس‌های سینمایی",
    icon: Clapperboard,
  },
];

const stats = [
  {
    value: "—",
    label: "کتاب",
    icon: LibraryBig,
  },
  {
    value: "—",
    label: "نویسنده",
    icon: NotebookPen,
  },
  {
    value: "—",
    label: "اقتباس",
    icon: LibraryBig,
  },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-svh w-full overflow-hidden select-none"
    >
      {/* Hero image */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/assets/images/hero/Rainy-converted.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[20%_center] md:object-[center_35%]"
        />
      </div>

      {/* Image atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/35 via-black/20 to-background dark:from-black/45 dark:via-black/30 dark:to-background"
      />

      {/* Warm sunset glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[18%] -z-10 h-112 w-2xl -translate-x-1/2 rounded-full bg-orange-400/20 blur-[110px] dark:bg-orange-500/20"
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-linear-to-t from-background via-background/85 to-transparent"
      />

      <div className="flex min-h-svh w-full flex-col justify-center px-4 pb-20 pt-28 sm:px-6 sm:pb-24">
        <div className="mx-auto w-full text-center">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3.5 py-1.5 text-xs font-medium text-white/90 shadow-lg backdrop-blur-md">
            <Sparkles className="size-3.5 text-amber-300" />

            <span>دنیای کتاب و اقتباس</span>
          </div>

          {/* Heading */}
          <h1
            id="hero-title"
            className="mx-auto flex flex-wrap items-center justify-center gap-x-3 text-4xl font-black leading-[1.2] tracking-tight text-orange-500 drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span>کتاب بعدی‌ات</span>

            <span className="mt-1 text-white">را پیدا کن</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 drop-shadow-lg sm:text-base sm:leading-8">
            کتاب‌ها، نویسندگان و داستان‌هایی را کشف کن که شاید قرار باشد بخشی
            از دنیای تو شوند.
          </p>

          {/* Main search */}
          <div className="mx-auto mt-8 w-full max-w-2xl sm:mt-10">
            <SearchDialog
              trigger={
                <button
                  type="button"
                  className="group flex h-14 w-full items-center gap-3 rounded-2xl
                   border border-white/25 bg-white/90 px-4 text-right text-sm 
                   text-muted-foreground shadow-2xl shadow-black/20 backdrop-blur-xl
                    transition-all duration-300 hover:border-orange-500/60 hover:bg-white hover:shadow-amber-900/20 focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-orange-500/70 dark:bg-background/90 
                    dark:hover:bg-background sm:h-16 sm:rounded-2xl sm:px-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Search className="size-4.5" />
                  </span>

                  <span className="min-w-0 flex-1 truncate">
                    دنبال چه کتاب یا نویسنده‌ای هستی؟
                  </span>

                  <span className="hidden h-11 shrink-0 items-center gap-1.5 rounded-lg border bg-primary/10 px-5 text-[11px] font-semibold text-primary sm:flex">
                    جستجو
                    <ArrowLeft className="size-4" />
                  </span>
                </button>
              }
            />
          </div>

          {/* Quick filters */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {quickFilters.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Icon className="size-3.5 text-amber-300" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-2 md:mt-auto grid w-full max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md">
          {stats.map(({ value, label, icon: Icon }, index) => (
            <div
              key={label}
              className={`flex flex-col items-center justify-center px-3 py-4 ${
                index !== stats.length - 1
                  ? "border-l border-white/10"
                  : ""
              }`}
            >
              <Icon className="size-5 text-orange-500 sm:size-5.5" />

              <span className="mt-1 text-lg font-bold text-white sm:text-xl">
                {value}
              </span>

              <span className="mt-0.5 text-[11px] text-white/60 sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
