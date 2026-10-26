import type { Metadata } from "next";
import Link from "next/link";

import { BookCard } from "@/components/home/book-card";
import { BooksToolbar } from "@/components/books/books-toolbar";
import {
  getBookFilterOptions,
  getPaginatedBooks,
} from "@/lib/supabase/queries/books";

export const metadata: Metadata = {
  title: "کتاب‌ها",
  description: "فهرست کتاب‌ها در پی‌رنگ؛ دنیای کتاب و اقتباس",
};

type BooksPageProps = {
  searchParams: Promise<{
    sort?: string;
    genre?: string;
    author?: string;
    language?: string;
    yearFrom?: string;
    yearTo?: string;
    page?: string;
    pageSize?: string;
  }>;
};

const validSortOptions = [
  "newest",
  "highest_rating",
  "most_rated",
  "alphabetical",
] as const;

const validPageSizes = [12, 24, 48] as const;

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;

  const sortBy = validSortOptions.includes(
    params.sort as (typeof validSortOptions)[number],
  )
    ? (params.sort as (typeof validSortOptions)[number])
    : "newest";

  const requestedPageSize = Number(params.pageSize);
  const pageSize = validPageSizes.includes(
    requestedPageSize as (typeof validPageSizes)[number],
  )
    ? (requestedPageSize as (typeof validPageSizes)[number])
    : 12;

  const parseYear = (value?: string) => {
    if (!value || !/^\d{1,4}$/.test(value)) return undefined;

    const year = Number(value);
    return year > 0 ? year : undefined;
  };

  const yearFrom = parseYear(params.yearFrom);
  const yearTo = parseYear(params.yearTo);

  const [result, filterOptions] = await Promise.all([
    getPaginatedBooks({
      page: Math.max(1, Number(params.page) || 1),
      pageSize,
      sortBy,
      genreSlug: params.genre || undefined,
      authorSlug: params.author || undefined,
      language: params.language || undefined,
      yearFrom:
        yearFrom !== undefined && yearTo !== undefined && yearFrom > yearTo
          ? yearTo
          : yearFrom,
      yearTo:
        yearFrom !== undefined && yearTo !== undefined && yearFrom > yearTo
          ? yearFrom
          : yearTo,
    }),
    getBookFilterOptions(),
  ]);

  const { books, totalCount, page } = result;
  const totalPages = Math.ceil(totalCount / pageSize);

  function pageUrl(targetPage: number) {
    const query = new URLSearchParams();

    if (params.sort) query.set("sort", sortBy);
    if (params.genre) query.set("genre", params.genre);
    if (params.author) query.set("author", params.author);
    if (params.language) query.set("language", params.language);
    if (yearFrom !== undefined) query.set("yearFrom", String(yearFrom));
    if (yearTo !== undefined) query.set("yearTo", String(yearTo));
    if (pageSize !== 12) query.set("pageSize", String(pageSize));
    if (targetPage > 1) query.set("page", String(targetPage));

    const queryString = query.toString();
    return queryString ? `/books?${queryString}` : "/books";
  }

  return (
    <main className="mx-auto min-h-screen w-[95%] max-w-7xl pt-20 pb-24 sm:pt-28 sm:pb-12">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">کتابخانه پی‌رنگ</h1>

        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          کتاب‌ها را کشف کن و به دنیای داستان‌ها قدم بگذار.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          {totalCount.toLocaleString("fa-IR")} کتاب
        </p>
      </header>

      <BooksToolbar
        genres={filterOptions.genres}
        authors={filterOptions.authors}
        languages={filterOptions.languages}
        minYear={filterOptions.minYear}
        maxYear={filterOptions.maxYear}
      />

      {books.length > 0 ? (
        <section
          aria-label="فهرست کتاب‌ها"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              slug={book.slug}
              title={book.title}
              author={book.author}
              rating={book.ratingAverage}
              cover={book.cover}
            />
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
          <p className="font-semibold">کتابی با این شرایط پیدا نشد.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            فیلترها را تغییر بده یا پاک کن و دوباره امتحان کن.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="صفحه‌بندی کتاب‌ها"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {page > 1 && (
            <Link
              href={pageUrl(page - 1)}
              className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              قبلی
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Link
                key={pageNumber}
                href={pageUrl(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
                className={`min-w-10 rounded-xl border px-3 py-2 text-center text-sm ${
                  pageNumber === page
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-border hover:bg-muted"
                }`}
              >
                {pageNumber.toLocaleString("fa-IR")}
              </Link>
            ),
          )}

          {page < totalPages && (
            <Link
              href={pageUrl(page + 1)}
              className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted"
            >
              بعدی
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
