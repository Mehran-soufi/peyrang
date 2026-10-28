import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clapperboard } from "lucide-react";

import { getAdaptations } from "@/lib/supabase/queries/catalog";

export const metadata: Metadata = {
  title: "اقتباس‌ها",
  description: "فیلم‌ها و سریال‌های اقتباس‌شده از کتاب‌ها را در پی‌رنگ ببین.",
};

const adaptationTypeLabels: Record<string, string> = {
  movie: "فیلم",
  film: "فیلم",
  series: "سریال",
  tv: "سریال",
};

export default async function AdaptationsPage() {
  const adaptations = await getAdaptations();

  return (
    <main className="mx-auto min-h-screen w-[95%] max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-12">
      <header className="mb-8">
        <p className="text-sm font-semibold text-primary">از کتاب تا پرده</p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">اقتباس‌ها</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          فیلم‌ها و سریال‌هایی را ببین که از دل کتاب‌ها ساخته شده‌اند.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {adaptations.length.toLocaleString("fa-IR")} اثر
        </p>
      </header>

      {adaptations.length ? (
        <section
          aria-label="فهرست اقتباس‌ها"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {adaptations.map((adaptation) => (
            <article
              key={adaptation.id}
              className="group flex min-h-48 overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="relative flex w-32 shrink-0 items-center justify-center overflow-hidden bg-primary/10 text-primary sm:w-36">
                {adaptation.posterUrl ? (
                  <Image
                    src={adaptation.posterUrl}
                    alt={`پوستر ${adaptation.title}`}
                    fill
                    unoptimized
                    sizes="144px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <Clapperboard className="size-10" aria-hidden="true" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                    {adaptationTypeLabels[adaptation.type] ?? adaptation.type}
                  </span>
                  {adaptation.releaseYear && (
                    <span className="text-muted-foreground">
                      {adaptation.releaseYear.toLocaleString("fa-IR")}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 line-clamp-2 font-bold">{adaptation.title}</h2>
                {adaptation.director && (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    کارگردان: {adaptation.director}
                  </p>
                )}
                {adaptation.description && (
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {adaptation.description}
                  </p>
                )}
                <div className="mt-auto pt-4">
                  {adaptation.book ? (
                    <Link
                      href={`/books/${adaptation.book.slug}`}
                      className="inline-flex max-w-full items-center gap-2 text-xs text-muted-foreground transition hover:text-primary"
                    >
                      <BookOpen className="size-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">کتاب: {adaptation.book.title}</span>
                    </Link>
                  ) : (
                    <p className="text-xs text-muted-foreground">کتاب مرتبط ثبت نشده</p>
                  )}
                  {adaptation.book?.author && (
                    <p className="mt-1 truncate pr-5 text-[11px] text-muted-foreground/80">
                      {adaptation.book.author}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
          <p className="font-semibold">هنوز اقتباسی ثبت نشده است.</p>
        </div>
      )}
    </main>
  );
}
