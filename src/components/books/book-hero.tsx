import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  FileText,
  Globe2,
  Heart,
  Share2,
  Star,
} from "lucide-react";

import { BookActions } from "@/components/books/book-actions";

import type { BookDetail as BookDetailData } from "@/lib/supabase/queries/books";

type BookHeroProps = {
  book: BookDetailData;
};

const languageLabels: Record<string, string> = {
  fa: "فارسی",
  en: "انگلیسی",
  ar: "عربی",
  fr: "فرانسوی",
  de: "آلمانی",
  es: "اسپانیایی",
  it: "ایتالیایی",
  ru: "روسی",
  tr: "ترکی",
};

export function BookHero({ book }: BookHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {book.cover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <Image
            src={book.cover}
            alt=""
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-15 blur-3xl"
          />

          <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" />

          <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/80 to-background" />
        </div>
      )}

      <div className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-4 lg:items-start">
          {/* Cover + Main Info */}
          <div className="flex flex-col gap-6 sm:flex-row lg:col-span-3">
            {/* Cover */}
            <div
              className="
  relative mx-auto
  aspect-3/4
  w-full max-w-55
  shrink-0 overflow-hidden
  rounded-xl border border-border/60
  bg-muted shadow-2xl shadow-black/25
  sm:mx-0 sm:aspect-4/5 sm:w-[38%] sm:max-w-none
  md:aspect-5/6 md:w-[40%]
  lg:aspect-3/4 lg:w-[32%]
  xl:w-[35%]
"
            >
              {book.cover ? (
                <Image
                  src={book.cover}
                  alt={`جلد کتاب ${book.title}`}
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 30vw, 25vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <BookOpen className="size-12 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Main Info */}
            <div className="min-w-0 flex-1 py-2 sm:py-4 lg:py-8 xl:py-10">
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  aria-label="افزودن به علاقه‌مندی‌ها"
                  className="
                    inline-flex size-10 items-center justify-center
                    rounded-xl
                    border border-border/70
                    bg-background/50
                    text-muted-foreground
                    backdrop-blur-md
                    transition-all
                    hover:border-orange-500/30
                    hover:bg-orange-500/10
                    hover:text-orange-500
                  "
                >
                  <Heart className="size-4" />
                </button>

                <button
                  type="button"
                  aria-label="اشتراک‌گذاری"
                  className="
                    inline-flex size-10 items-center justify-center
                    rounded-xl
                    border border-border/70
                    bg-background/50
                    text-muted-foreground
                    backdrop-blur-md
                    transition-all
                    hover:border-orange-500/30
                    hover:bg-orange-500/10
                    hover:text-orange-500
                  "
                >
                  <Share2 className="size-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      rounded-full
                      border border-orange-500/20
                      bg-orange-500/10
                      px-2.5 py-1
                      text-[11px] font-medium
                      text-orange-500
                    "
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 font-black tracking-tight text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {book.title}
              </h1>

              {book.originalTitle && (
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {book.originalTitle}
                </p>
              )}

              {book.author && (
                <Link
                  href={`/authors/${book.author.slug}`}
                  className="
                    mt-3 inline-flex
                    text-sm font-bold
                    text-orange-500
                    transition-colors
                    hover:text-orange-400
                  "
                >
                  {book.author.name}
                </Link>
              )}

              {/* Rating */}
              <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-orange-500 text-orange-500" />

                  <span className="text-sm font-bold">—</span>
                </div>

                <span className="text-xs text-muted-foreground">
                  بدون امتیاز
                </span>
              </div>

              {/* Actions */}
              <div className="mt-5">
                <BookActions />
              </div>
            </div>
          </div>

          {/* Book Info */}
          <aside
            className="
  my-0 lg:my-4 xl:my-10
  min-w-0 rounded-2xl
  border border-border/60
  bg-background/40 p-3 sm:p-4
  backdrop-blur-md
"
          >
            <h2 className="text-sm font-bold">اطلاعات کتاب</h2>

            <div className="mt-4 divide-y divide-border/40">
              <div className="flex items-center gap-3 py-3 first:pt-0">
                <CalendarDays className="size-4 shrink-0 text-orange-500" />

                <div>
                  <p className="text-[11px] text-muted-foreground">
                    سال انتشار
                  </p>

                  <p className="mt-0.5 text-xs font-semibold">
                    {book.publicationYear ?? "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3">
                <FileText className="size-4 shrink-0 text-orange-500" />

                <div>
                  <p className="text-[11px] text-muted-foreground">
                    تعداد صفحات
                  </p>

                  <p className="mt-0.5 text-xs font-semibold">
                    {book.pageCount ? `${book.pageCount} صفحه` : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3">
                <Globe2 className="size-4 shrink-0 text-orange-500" />

                <div>
                  <p className="text-[11px] text-muted-foreground">زبان</p>

                  <p className="mt-0.5 text-xs font-semibold">
                    {languageLabels[book.language ?? ""] ??
                      book.language ??
                      "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3">
                <BookOpen className="size-4 shrink-0 text-orange-500" />

                <div>
                  <p className="text-[11px] text-muted-foreground">ناشر</p>

                  <p className="mt-0.5 text-xs font-semibold">—</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3 last:pb-0">
                <BookOpen className="size-4 shrink-0 text-orange-500" />

                <div>
                  <p className="text-[11px] text-muted-foreground">شابک</p>

                  <p className="mt-0.5 text-xs font-semibold">—</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
