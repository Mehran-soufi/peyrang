import type { Metadata } from "next";
import Link from "next/link";

import { AuthorCard } from "@/components/home/author-card";
import { getAuthors } from "@/lib/supabase/queries/catalog";

const AUTHORS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "نویسندگان",
  description: "نویسندگان کتاب‌های پی‌رنگ را پیدا کن و با آثارشان آشنا شو.",
};

type AuthorsPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function AuthorsPage({ searchParams }: AuthorsPageProps) {
  const params = await searchParams;
  const requestedPage = Math.floor(
    Number(Array.isArray(params.page) ? params.page[0] : params.page) || 1,
  );
  const authors = await getAuthors();
  const totalPages = Math.max(1, Math.ceil(authors.length / AUTHORS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const visibleAuthors = authors.slice(
    (currentPage - 1) * AUTHORS_PER_PAGE,
    currentPage * AUTHORS_PER_PAGE,
  );

  return (
    <main className="mx-auto min-h-screen w-[95%] max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-12">
      <header className="mb-8">
        <p className="text-sm font-semibold text-primary">کتابخانهٔ پی‌رنگ</p>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">نویسندگان</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          نویسندگان کتاب‌های پی‌رنگ را پیدا کن و با آثارشان آشنا شو.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {authors.length.toLocaleString("fa-IR")} نویسنده
        </p>
      </header>

      {authors.length ? (
        <section
          aria-label="فهرست نویسندگان"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleAuthors.map((author) => {
            if (author.featuredOrder !== null) {
              return (
                <Link
                  key={author.id}
                  href={`/authors/${author.slug}`}
                  aria-label={`دیدن کتاب‌های ${author.name}`}
                  className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <AuthorCard
                    name={author.name}
                    nationality={author.nationality ?? ""}
                    birthYear={author.birthYear ?? 0}
                    deathYear={author.deathYear ?? undefined}
                    booksCount={author.bookCount}
                    image={
                      author.featuredImage ??
                      author.avatarUrl ??
                      "/assets/icon/payrang-icon.png"
                    }
                  />
                </Link>
              );
            }

            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                aria-label={`دیدن کتاب‌های ${author.name}`}
                className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <AuthorCard
                  name={author.name}
                  nationality={author.nationality ?? ""}
                  birthYear={author.birthYear ?? 0}
                  deathYear={author.deathYear ?? undefined}
                  booksCount={author.bookCount}
                  image={author.featuredImage ?? author.avatarUrl}
                />
              </Link>
            );
          })}
        </section>
      ) : (
        <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
          <p className="font-semibold">هنوز نویسنده‌ای ثبت نشده است.</p>
        </div>
      )}

      {totalPages > 1 ? (
        <nav
          aria-label="صفحه‌بندی نویسندگان"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {currentPage > 1 ? (
            <Link
              href={`/authors?page=${currentPage - 1}`}
              className="rounded-xl border border-border px-4 py-2 text-sm transition hover:border-primary/40 hover:text-primary"
            >
              قبلی
            </Link>
          ) : null}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Link
                key={page}
                href={page === 1 ? "/authors" : `/authors?page=${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={`min-w-10 rounded-xl border px-3 py-2 text-center text-sm transition ${
                  page === currentPage
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {page.toLocaleString("fa-IR")}
              </Link>
            ),
          )}
          {currentPage < totalPages ? (
            <Link
              href={`/authors?page=${currentPage + 1}`}
              className="rounded-xl border border-border px-4 py-2 text-sm transition hover:border-primary/40 hover:text-primary"
            >
              بعدی
            </Link>
          ) : null}
        </nav>
      ) : null}
    </main>
  );
}
