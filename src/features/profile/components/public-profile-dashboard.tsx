import Link from "next/link";
import { BookHeart, BookOpen, UserRound } from "lucide-react";

import type {
  getPublicProfileReviews,
  getPublicProfileFavorites,
} from "@/lib/supabase/queries/public-profile";
import { toPersianNumber } from "@/lib/utils/format-number";

type PublicReviews = Awaited<ReturnType<typeof getPublicProfileReviews>>;

type PublicFavorites = Awaited<ReturnType<typeof getPublicProfileFavorites>>;

type PublicProfileDashboardProps = {
  reviews: PublicReviews;
  favorites: PublicFavorites;
  showReviews: boolean;
  showFavorites: boolean;
};

export function PublicProfileDashboard({
  reviews,
  favorites,
  showReviews,
  showFavorites,
}: PublicProfileDashboardProps) {
  if (!showReviews && !showFavorites) {
    return (
      <div className="rounded-2xl border border-dashed p-8 text-center">
        <UserRound className="mx-auto size-8 text-muted-foreground" />
        <p className="mt-3 font-medium">
          این کاربر هنوز بخشی برای نمایش عمومی فعال نکرده است.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {showReviews && (
        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <BookOpen className="size-5 text-primary" />
              نقدهای کاربر
            </h2>
            <span className="text-sm text-muted-foreground">
              {toPersianNumber(reviews.length)} نقد
            </span>
          </div>

          {reviews.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              هنوز نقد تأییدشده‌ای برای نمایش وجود ندارد.
            </p>
          ) : (
            <div className="mt-4 grid gap-4">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border bg-card/60 p-5"
                >
                  {review.book && (
                    <Link
                      href={`/books/${review.book.slug}`}
                      className="font-semibold transition-colors hover:text-primary"
                    >
                      {review.book.title}
                    </Link>
                  )}

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-muted-foreground">
                    {review.content}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {showFavorites && (
        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <BookHeart className="size-5 text-primary" />
              کتاب‌های موردعلاقه
            </h2>
            <span className="text-sm text-muted-foreground">
              {toPersianNumber(favorites.length)} کتاب
            </span>
          </div>

          {favorites.length === 0 ? (
            <p className="mt-4 rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              هنوز کتابی به علاقه‌مندی‌ها اضافه نشده است.
            </p>
          ) : (
            <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {favorites.map((favorite) => {
                const book = favorite.book;

                if (!book) return null;

                return (
                  <article
                    key={book.id}
                    className="w-40 shrink-0 snap-start overflow-hidden rounded-2xl border bg-card/60 transition-colors hover:border-primary/40 sm:w-44"
                  >
                    <Link href={`/books/${book.slug}`} className="block">
                      {book.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="aspect-3/4 w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-3/4 items-center justify-center bg-muted">
                          <BookHeart className="size-8 text-muted-foreground" />
                        </div>
                      )}

                      <h3 className="line-clamp-2 p-3 text-sm font-medium">
                        {book.title}
                      </h3>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
