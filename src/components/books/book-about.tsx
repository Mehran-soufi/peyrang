import type { BookDetail as BookDetailData } from "@/lib/supabase/queries/books";

type BookAboutProps = {
  book: BookDetailData;
};

export function BookAbout({ book }: BookAboutProps) {
  if (!book.description) return null;

  return (
   <section className="w-full min-w-0">
      <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur-md sm:p-8">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-orange-500" />
          <h2 className="text-xl font-black">درباره کتاب</h2>
        </div>

        <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground sm:text-base">
          {book.description}
        </p>
      </div>
    </section>
  );
}
