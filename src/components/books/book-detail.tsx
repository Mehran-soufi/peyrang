"use client";

import { useState } from "react";

import { BookAbout } from "@/components/books/book-about";
import { BookAdaptations } from "@/components/books/book-adaptations";
import { BookAuthor } from "@/components/books/book-author";
import { BookDetailTabs } from "@/components/books/book-detail-tabs";
import { BookHero } from "@/components/books/book-hero";
import { BookRating } from "@/components/books/book-rating";
import { SimilarBooks } from "@/components/books/similar-books";

import type { BookDetail as BookDetailData } from "@/lib/supabase/queries/books";

type BookDetailProps = {
  book: BookDetailData;
};

export function BookDetail({ book }: BookDetailProps) {
  const [activeTab, setActiveTab] = useState("about");
  const [hasOpenedSimilarBooks, setHasOpenedSimilarBooks] = useState(false);

  return (
    <div className="pb-16 w-[95%] mx-auto">
      <BookHero book={book} />

      <div className="mx-auto w-full px-4 sm:px-6">
        <BookDetailTabs
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            if (tab === "similar") setHasOpenedSimilarBooks(true);
          }}
        />

        <div className="mt-6">
          {activeTab === "about" && (
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="order-2 min-w-0 lg:order-1">
                <BookAbout book={book} />
              </div>

              <div className="order-1 min-w-0 lg:order-2">
                <div className="lg:sticky lg:top-33">
                  <BookRating bookId={book.id} mode="summary" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <BookRating bookId={book.id} mode="interactive" />
          )}

          {hasOpenedSimilarBooks && (
            <div className={activeTab === "similar" ? "" : "hidden"}>
              <SimilarBooks slug={book.slug} />
            </div>
          )}

          {activeTab === "author" && <BookAuthor book={book} />}
        </div>

        {book.adaptations.length > 0 && (
          <div className="mt-6">
            <BookAdaptations book={book} />
          </div>
        )}
      </div>
    </div>
  );
}
