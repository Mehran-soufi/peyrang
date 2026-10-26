"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookHeart, Heart, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

type FavoriteBook = {
  createdAt: string;
  book: {
    id: string;
    title: string;
    slug: string;
    cover: string | null;
  } | null;
};

type FavoriteBooksProps = {
  initialFavorites: FavoriteBook[];
};

export function FavoriteBooks({ initialFavorites }: FavoriteBooksProps) {
  const [favorites, setFavorites] = useState(initialFavorites);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("favorites-count-change", {
        detail: favorites.length,
      }),
    );
  }, [favorites.length]);

  async function handleRemove(bookId: string) {
    if (removingId) return;

    setRemovingId(bookId);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error("برای حذف علاقه‌مندی، ابتدا وارد حساب کاربری شوید.");
        return;
      }

      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("book_id", bookId);

      if (error) {
        console.error("Remove favorite error:", error);
        toast.error("حذف کتاب از علاقه‌مندی‌ها ناموفق بود.");
        return;
      }

      setFavorites((current) =>
        current.filter((favorite) => favorite.book?.id !== bookId),
      );

      toast.success("کتاب از علاقه‌مندی‌ها حذف شد.");
    } catch (error) {
      console.error("Remove favorite error:", error);
      toast.error("خطایی هنگام حذف کتاب رخ داد.");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">کتاب‌های موردعلاقه</h2>
        <span className="text-sm text-muted-foreground">
          {favorites.length} کتاب
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed p-8 text-center">
          <BookHeart className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 font-medium">
            هنوز کتابی به علاقه‌مندی‌ها اضافه نکرده‌اید
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            کتاب‌های موردعلاقه‌تان را ذخیره کنید تا اینجا در دسترس باشند.
          </p>
          <Link
            href="/books"
            className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
          >
            کشف کتاب‌ها
          </Link>
        </div>
      ) : (
        <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {favorites.map((favorite) => {
            const book = favorite.book;

            if (!book) return null;

            const isRemoving = removingId === book.id;

            return (
              <article
                key={book.id}
                className="w-40 shrink-0 snap-start overflow-hidden rounded-2xl border bg-card/60 transition-colors hover:border-primary/40 sm:w-44"
              >
                <div className="relative">
                  <Link
                    href={`/books/${book.slug}`}
                    className="block"
                    aria-label={`مشاهده کتاب ${book.title}`}
                  >
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
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleRemove(book.id)}
                    disabled={removingId !== null}
                    aria-label={`حذف ${book.title} از علاقه‌مندی‌ها`}
                    title="حذف از علاقه‌مندی‌ها"
                    className="absolute left-2 top-2 inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/90 text-orange-500 shadow-sm backdrop-blur transition-colors hover:bg-orange-500 hover:text-white disabled:cursor-wait disabled:opacity-60"
                  >
                    {isRemoving ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Heart className="size-4 fill-current" />
                    )}
                  </button>
                </div>

                <Link href={`/books/${book.slug}`} className="block p-3">
                  <h3 className="line-clamp-2 text-sm font-medium">
                    {book.title}
                  </h3>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
