"use client";

import { useState } from "react";

import { BookAbout } from "@/components/books/book-about";
import { BookAdaptations } from "@/components/books/book-adaptations";
import { BookAuthor } from "@/components/books/book-author";
import { BookDetailTabs } from "@/components/books/book-detail-tabs";
import { BookHero } from "@/components/books/book-hero";
import { BookRating } from "@/components/books/book-rating";

import type { BookDetail as BookDetailData } from "@/lib/supabase/queries/books";

type BookDetailProps = {
  book: BookDetailData;
};

export function BookDetail({ book }: BookDetailProps) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="pb-16 w-[95%] mx-auto">
      <BookHero book={book} />

      <div className="mx-auto w-full px-4 sm:px-6">
        <BookDetailTabs activeTab={activeTab} onChange={setActiveTab} />

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

          {activeTab === "similar" && (
            <section className="rounded-2xl border border-border/60 bg-background/40 p-6">
              <h2 className="text-lg font-black">کتاب‌های مشابه</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                کتاب‌های مشابه در این بخش نمایش داده خواهند شد.
              </p>
            </section>
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
