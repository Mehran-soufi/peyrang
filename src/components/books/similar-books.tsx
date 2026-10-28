"use client";

import { useEffect, useState } from "react";

import { BookCard } from "@/components/home/book-card";
import { BookCardSkeleton } from "@/components/home/book-card-skeleton";
import type { SimilarBook } from "@/lib/supabase/queries/books";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SimilarBooksProps = {
  slug: string;
};

type SimilarBooksState =
  | { status: "loading" }
  | { status: "loaded"; books: SimilarBook[] }
  | { status: "error" };

function SimilarBooksSkeleton() {
  return (
    <div
      aria-label="در حال بارگذاری کتاب‌های مشابه"
      aria-busy="true"
      role="status"
      className="w-full min-w-0 max-w-full overflow-hidden"
    >
      <Carousel
        opts={{ align: "start", dragFree: true, direction: "rtl" }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {Array.from({ length: 8 }, (_, index) => (
            <CarouselItem
              key={index}
              dir="rtl"
              className="basis-38.75 pl-4 sm:basis-45 lg:basis-50"
            >
              <BookCardSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="size-9 cursor-pointer rounded-full border-orange-500/30 bg-orange-500/10 text-foreground/70 opacity-60 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/60 hover:text-white hover:opacity-100 hover:shadow-orange-500/20 disabled:pointer-events-none disabled:opacity-0 sm:flex" />
        <CarouselNext className="size-9 cursor-pointer rounded-full border-orange-500/30 bg-orange-500/10 text-foreground/70 opacity-60 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/60 hover:text-white hover:opacity-100 hover:shadow-orange-500/20 disabled:pointer-events-none disabled:opacity-0 sm:flex" />
      </Carousel>
    </div>
  );
}

export function SimilarBooks({ slug }: SimilarBooksProps) {
  const [state, setState] = useState<SimilarBooksState>({ status: "loading" });
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSimilarBooks() {
      setState({ status: "loading" });

      try {
        const response = await fetch(
          `/api/books/${encodeURIComponent(slug)}/similar`,
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("Similar books request failed");

        const result = (await response.json()) as { books: SimilarBook[] };
        setState({ status: "loaded", books: result.books });
      } catch {
        if (!controller.signal.aborted) setState({ status: "error" });
      }
    }

    void loadSimilarBooks();
    return () => controller.abort();
  }, [slug, retryKey]);

  return (
    <section
      aria-labelledby="similar-books-title"
      className="rounded-2xl border border-border/60 bg-background/40 p-5 sm:p-6"
    >
      <h2 id="similar-books-title" className="text-lg font-black">
        کتاب‌های مشابه
      </h2>

      <div className="mt-6">
        {state.status === "loading" ? <SimilarBooksSkeleton /> : null}

        {state.status === "error" ? (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-destructive/10 p-4 text-sm text-destructive"
          >
            <span>بارگذاری کتاب‌های مشابه انجام نشد.</span>
            <button
              type="button"
              onClick={() => setRetryKey((current) => current + 1)}
              className="rounded-lg border border-destructive/20 px-3 py-1.5 font-semibold transition hover:bg-destructive/10"
            >
              تلاش دوباره
            </button>
          </div>
        ) : null}

        {state.status === "loaded" && state.books.length > 0 ? (
          <div className="w-full min-w-0 max-w-full overflow-hidden">
            <Carousel
              opts={{ align: "start", dragFree: true, direction: "rtl" }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {state.books.map((book) => (
                  <CarouselItem
                    key={book.id}
                    dir="rtl"
                    className="basis-38.75 pl-4 sm:basis-45 lg:basis-50"
                  >
                    <BookCard
                      id={book.id}
                      slug={book.slug}
                      title={book.title}
                      author={book.author}
                      cover={book.cover}
                      rating={book.ratingAverage}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="size-9 cursor-pointer rounded-full border-orange-500/30 bg-orange-500/10 text-foreground/70 opacity-60 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/60 hover:text-white hover:opacity-100 hover:shadow-orange-500/20 disabled:pointer-events-none disabled:opacity-0 sm:flex" />
              <CarouselNext className="size-9 cursor-pointer rounded-full border-orange-500/30 bg-orange-500/10 text-foreground/70 opacity-60 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/60 hover:text-white hover:opacity-100 hover:shadow-orange-500/20 disabled:pointer-events-none disabled:opacity-0 sm:flex" />
            </Carousel>
          </div>
        ) : null}

        {state.status === "loaded" && state.books.length === 0 ? (
          <p className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
            هنوز کتاب مشابهی بر اساس ژانر یا نویسنده برای این کتاب پیدا نشد.
          </p>
        ) : null}
      </div>
    </section>
  );
}
