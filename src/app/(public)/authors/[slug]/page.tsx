import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, UserRound } from "lucide-react";

import { BookCard } from "@/components/home/book-card";
import { getAuthorBySlug } from "@/lib/supabase/queries/catalog";
import { getPaginatedBooks } from "@/lib/supabase/queries/books";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  return {
    title: author?.name ?? "نویسنده پیدا نشد",
    description: author?.bio ?? "کتاب‌های این نویسنده را در پی‌رنگ ببین.",
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) notFound();

  const { books, totalCount } = await getPaginatedBooks({
    authorSlug: author.slug,
    page: 1,
    pageSize: 48,
    sortBy: "newest",
  });

  return (
    <main className="mx-auto min-h-screen w-[95%] max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-12">
      <Link
        href="/authors"
        className="inline-flex items-center gap-2 rounded-lg text-sm text-muted-foreground transition hover:text-primary"
      >
        <ArrowRight className="size-4" aria-hidden="true" />
        همهٔ نویسندگان
      </Link>

      <header className="mt-6 flex flex-col gap-5 rounded-2xl border border-border/60 bg-card/50 p-5 sm:flex-row sm:items-center sm:p-7">
        <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-primary sm:size-32">
          {author.featuredImage ?? author.avatarUrl ? (
            <Image
              src={author.featuredImage ?? author.avatarUrl!}
              alt={author.name}
              fill
              unoptimized
              sizes="128px"
              className="object-cover"
              priority
            />
          ) : (
            <UserRound className="size-10 sm:size-12" aria-hidden="true" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">نویسنده</p>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            {author.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {author.nationality ? <span>{author.nationality}</span> : null}
            {author.birthYear ? (
              <span dir="ltr">
                {author.birthYear.toLocaleString("fa-IR")}
                {author.deathYear
                  ? ` — ${author.deathYear.toLocaleString("fa-IR")}`
                  : ""}
              </span>
            ) : null}
            <span>{author.bookCount.toLocaleString("fa-IR")} کتاب در پی‌رنگ</span>
          </div>
        </div>
      </header>

      {author.bio ? (
        <section className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-7">
          <h2 className="text-lg font-bold">زندگی‌نامه</h2>
          <p className="mt-4 max-w-4xl whitespace-pre-line text-sm leading-8 text-muted-foreground sm:text-base">
            {author.bio}
          </p>
        </section>
      ) : null}

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold">کتاب‌های این نویسنده</h2>
          <span className="text-sm text-muted-foreground">
            {totalCount.toLocaleString("fa-IR")} کتاب
          </span>
        </div>

        {books.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
        ) : (
          <div className="rounded-2xl border border-border bg-card px-4 py-12 text-center">
            <p className="font-semibold">هنوز کتابی برای این نویسنده ثبت نشده است.</p>
          </div>
        )}
      </section>
    </main>
  );
}
