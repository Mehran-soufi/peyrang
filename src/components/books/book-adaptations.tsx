import Image from "next/image";
import Link from "next/link";
import { Clapperboard, UserRound } from "lucide-react";

import type { BookDetail as BookDetailData } from "@/lib/supabase/queries/books";

type BookAdaptationsProps = {
  book: BookDetailData;
};

const adaptationTypeLabels: Record<string, string> = {
  movie: "فیلم",
  series: "سریال",
  film: "فیلم",
  tv: "سریال",
};

export function BookAdaptations({ book }: BookAdaptationsProps) {
  if (!book.adaptations.length) return null;

  return (
    <section className="mx-auto w-[95%] max-w-6xl px-4 sm:px-6">
      <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur-md sm:p-8">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-orange-500" />

          <div>
            <h2 className="text-xl font-black">
              اقتباس‌های سینمایی و تلویزیونی
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              آثاری که بر اساس این کتاب ساخته شده‌اند
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {book.adaptations.map((adaptation) => (
            <article
              key={adaptation.id}
              className="
                group overflow-hidden
                rounded-2xl
                border border-border/60
                bg-background/40
                transition-all duration-300
                hover:-translate-y-1
                hover:border-orange-500/25
                hover:shadow-lg hover:shadow-orange-500/5
              "
            >
              <div className="flex gap-4 p-4">
                <div className="relative aspect-2/3 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {adaptation.posterUrl ? (
                    <Image
                      src={adaptation.posterUrl}
                      alt={adaptation.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Clapperboard className="size-8 text-orange-500/60" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 py-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-[11px] font-medium text-orange-500">
                      {adaptationTypeLabels[adaptation.type] ?? adaptation.type}
                    </span>

                    {adaptation.releaseYear && (
                      <span className="text-xs text-muted-foreground">
                        {adaptation.releaseYear}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-base font-bold leading-7">
                    {adaptation.title}
                  </h3>

                  {adaptation.director && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <UserRound className="size-3.5" />
                      <span>کارگردان: {adaptation.director}</span>
                    </div>
                  )}

                  {adaptation.description && (
                    <p className="mt-3 line-clamp-2 text-xs leading-6 text-muted-foreground">
                      {adaptation.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
