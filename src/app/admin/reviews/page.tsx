import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ReviewActions } from "./review-actions";

export default async function AdminReviewsPage() {
  await requireAdmin();

  const supabase = await createClient();

  const { data: reviews, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      content,
      created_at,
      status,
      book:books!reviews_book_id_fkey (
        id,
        title,
        slug
      ),
      profile:profiles!reviews_user_id_fkey (
        id,
        username,
        display_name
      )
    `,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`خطا در دریافت نقدها: ${error.message}`);
  }

  return (
    <main className="min-h-screen bg-background p-6 sm:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <Link
            href="/admin"
            className="text-sm text-muted-foreground transition-colors hover:text-orange-500"
          >
            ← بازگشت به داشبورد مدیریت
          </Link>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-orange-500">
              PEYRANG / ADMIN
            </p>

            <h1 className="text-2xl font-black sm:text-3xl">
              بررسی و تأیید نقدها
            </h1>

            <p className="text-sm text-muted-foreground">
              نقدهای جدید کاربران را پیش از انتشار بررسی کن.
            </p>
          </div>
        </header>

        <div className="flex items-center justify-between rounded-xl border bg-card p-4">
          <span className="text-sm text-muted-foreground">
            نقدهای در انتظار بررسی
          </span>

          <span className="text-lg font-black tabular-nums">
            {reviews?.length ?? 0}
          </span>
        </div>

        {!reviews?.length ? (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <h2 className="font-bold">نقدی برای بررسی وجود ندارد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              نقدهای جدید کاربران در این بخش نمایش داده می‌شوند.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              const book = Array.isArray(review.book)
                ? review.book[0]
                : review.book;

              const profile = Array.isArray(review.profile)
                ? review.profile[0]
                : review.profile;

              return (
                <article
                  key={review.id}
                  className="space-y-5 rounded-2xl border bg-card p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h2 className="font-bold">
                        {book?.title ?? "کتاب نامشخص"}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        نویسنده نقد:{" "}
                        {profile?.display_name ||
                          (profile?.username
                            ? `@${profile.username}`
                            : "کاربر ناشناس")}
                      </p>
                    </div>

                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-600">
                      در انتظار تأیید
                    </span>
                  </div>

                  <div className="whitespace-pre-wrap wrap-break-word text-sm leading-8">
                    {review.content}
                  </div>

                  <div className="border-t pt-3 text-xs text-muted-foreground">
                    تاریخ ثبت:{" "}
                    {new Date(review.created_at).toLocaleString("fa-IR")}
                  </div>
                  <ReviewActions reviewId={review.id} />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
