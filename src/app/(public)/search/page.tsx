import { BookOpen, Search } from "lucide-react";

import { BookCard } from "@/components/home/book-card";
import { searchBooks } from "@/lib/supabase/queries/search";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const books = query ? await searchBooks(query, 30) : [];

  return (
    <main className="md:mt-16 mt-13 min-h-[70vh]">
      <section className="mx-auto w-[95%] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Search className="size-5" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">جست‌وجو در پی‌رنگ</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              {query ? `نتایج جست‌وجوی «${query}»` : "جست‌وجو"}
            </h1>
          </div>
        </div>

        {!query ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 px-4 py-16 text-center">
            <Search className="mb-4 size-10 text-muted-foreground/50" />
            <h2 className="font-bold">دنبال چه کتابی می‌گردی؟</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              عبارت موردنظرت رو از طریق جست‌وجوی سایت وارد کن.
            </p>
          </div>
        ) : books.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              {books.length === 30
                ? "۳۰ نتیجه اول"
                : `${books.length} کتاب پیدا شد`}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  slug={book.slug}
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                  rating={book.ratingAverage}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 px-4 py-16 text-center">
            <BookOpen className="mb-4 size-10 text-muted-foreground/50" />
            <h2 className="font-bold">کتابی پیدا نشد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              عنوان کتاب رو بررسی کن یا عبارت دیگری رو امتحان کن.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
