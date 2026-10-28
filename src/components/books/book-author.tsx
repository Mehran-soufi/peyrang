import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, UserRound } from "lucide-react";

import type { BookDetail as BookDetailData } from "@/lib/supabase/queries/books";

type BookAuthorProps = {
  book: BookDetailData;
};

export function BookAuthor({ book }: BookAuthorProps) {
  if (!book.author) return null;

  return (
    <section className="mx-auto w-[95%] max-w-6xl px-4 sm:px-6">
      <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur-md sm:p-8">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-orange-500" />
          <h2 className="text-xl font-black">درباره نویسنده</h2>
        </div>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/15 sm:size-28">
            {book.author.avatarUrl ? (
              <Image
                src={book.author.avatarUrl}
                alt={book.author.name}
                fill
                unoptimized
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <UserRound className="size-9 text-orange-500" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold">{book.author.name}</h3>
            {(book.author.nationality || book.author.birthYear) && (
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {book.author.nationality ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-orange-500/80" aria-hidden="true" />
                    {book.author.nationality}
                  </span>
                ) : null}
                {book.author.birthYear ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 text-orange-500/80" aria-hidden="true" />
                    <span dir="ltr">
                      {book.author.birthYear.toLocaleString("fa-IR")}
                      {book.author.deathYear
                        ? ` — ${book.author.deathYear.toLocaleString("fa-IR")}`
                        : ""}
                    </span>
                  </span>
                ) : null}
              </div>
            )}
            {book.author.bio ? (
              <p className="mt-3 line-clamp-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                {book.author.bio}
              </p>
            ) : null}
          </div>

          <Link
            href={`/authors/${book.author.slug}`}
            className="
              inline-flex shrink-0 items-center gap-2
              rounded-xl
              border border-orange-500/20
              bg-orange-500/10
              px-4 py-2.5
              text-sm font-semibold text-orange-500
              transition-all
              hover:border-orange-500/30
              hover:bg-orange-500/15
            "
          >
            مشاهده نویسنده
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
