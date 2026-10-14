import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";

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
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/15">
            <UserRound className="size-8 text-orange-500" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold">{book.author.name}</h3>
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