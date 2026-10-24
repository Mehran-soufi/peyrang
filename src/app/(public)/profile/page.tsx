
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookHeart, MessageSquareText, UserRound } from "lucide-react";

import {
  getMyFavorites,
  getMyReviews,
} from "@/lib/supabase/queries/profile";
import { createClient } from "@/lib/supabase/server";

const reviewStatusLabels: Record<string, string> = {
  approved: "تأیید شده",
  pending: "در انتظار بررسی",
  rejected: "رد شده",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const [
    { data: profile, error: profileError },
    reviews,
    favorites,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("username, display_name, avatar_url, bio, role, created_at")
      .eq("id", user.id)
      .maybeSingle(),
    getMyReviews(user.id),
    getMyFavorites(user.id),
  ]);

  if (profileError) {
    throw new Error("دریافت اطلاعات پروفایل با خطا مواجه شد.");
  }

  const displayName =
    profile?.display_name || profile?.username || "کاربر پی‌رنگ";

  return (
    <div className="mx-auto w-[95%] max-w-5xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <section className="overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-sm backdrop-blur-xl">
        <div className="h-28 bg-linear-to-l from-primary/30 via-primary/10 to-transparent sm:h-36" />

        <div className="px-5 pb-7 sm:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-card bg-muted text-muted-foreground sm:size-24">
              {profile?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="size-full object-cover"
                />
              ) : (
                <UserRound className="size-10 sm:size-12" />
              )}
            </div>

            <div className="min-w-0 flex-1 pb-1">
              <h1 className="text-xl font-bold sm:text-2xl">
                {displayName}
              </h1>
              {profile?.username && (
                <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                  @{profile.username}
                </p>
              )}
            </div>

            <span className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {profile?.role === "admin" ? "مدیر پی‌رنگ" : "عضو پی‌رنگ"}
            </span>
          </div>

          {profile?.bio && (
            <p className="mt-5 max-w-2xl whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
              {profile.bio}
            </p>
          )}
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl border bg-card/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageSquareText className="size-5" />
            <span className="text-sm">نقدهای من</span>
          </div>
          <p className="mt-3 text-2xl font-bold">{reviews.length}</p>
        </div>

        <div className="rounded-2xl border bg-card/60 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookHeart className="size-5" />
            <span className="text-sm">کتاب‌های موردعلاقه</span>
          </div>
          <p className="mt-3 text-2xl font-bold">{favorites.length}</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">نقدهای من</h2>
          <span className="text-sm text-muted-foreground">
            {reviews.length} نقد
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed p-8 text-center">
            <MessageSquareText className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 font-medium">هنوز نقدی ننوشته‌اید</p>
            <p className="mt-1 text-sm text-muted-foreground">
              به صفحه یکی از کتاب‌ها بروید و نظر خود را ثبت کنید.
            </p>
            <Link
              href="/books"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
            >
              مشاهده کتاب‌ها
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border bg-card/60 p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">
                    {review.book ? (
                      <Link
                        href={`/books/${review.book.slug}`}
                        className="hover:text-primary"
                      >
                        {review.book.title}
                      </Link>
                    ) : (
                      "کتاب"
                    )}
                  </h3>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                    {reviewStatusLabels[review.status] ?? review.status}
                  </span>
                </div>

                <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                  {review.content}
                </p>

                <p className="mt-3 text-xs text-muted-foreground">
                  ثبت‌شده در{" "}
                  {new Date(review.createdAt).toLocaleDateString("fa-IR")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">کتاب‌های موردعلاقه</h2>
          <span className="text-sm text-muted-foreground">
            {favorites.length} کتاب
          </span>
        </div>

        {favorites.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed p-8 text-center">
            <BookHeart className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 font-medium">هنوز کتابی به علاقه‌مندی‌ها اضافه نکرده‌اید</p>
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
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {favorites.map((favorite) => (
              <article
                key={`${favorite.book?.id ?? favorite.createdAt}`}
                className="overflow-hidden rounded-2xl border bg-card/60 transition-colors hover:border-primary/40"
              >
                {favorite.book ? (
                  <Link href={`/books/${favorite.book.slug}`} className="block">
                    {favorite.book.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={favorite.book.cover}
                        alt={favorite.book.title}
                        className="aspect-3/4 w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-3/4 items-center justify-center bg-muted">
                        <BookHeart className="size-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="line-clamp-2 text-sm font-medium">
                        {favorite.book.title}
                      </h3>
                    </div>
                  </Link>
                ) : (
                  <p className="p-3 text-sm text-muted-foreground">
                    اطلاعات کتاب در دسترس نیست.
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
