import Link from "next/link";

import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import { ContributionActions } from "./contribution-actions";

const contributionTypeLabels: Record<string, string> = {
  book_summary: "خلاصه کتاب",
  author_bio: "زندگی‌نامه نویسنده",
  adaptation: "معرفی اقتباس",
  recommendation: "پیشنهاد کتاب",
  correction: "اصلاح اطلاعات",
};

export default async function AdminContributionsPage() {
  await requireAdmin();

  const supabase = await createClient();

  const { data: contributions, error } = await supabase
    .from("contributions")
    .select(
      `
      id,
      user_id,
      type,
      subject,
      content,
      source_url,
      created_at,
      profile:profiles!contributions_user_id_profiles_fkey (
        id,
        username,
        display_name,
        avatar_url
      )
    `,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`خطا در دریافت مشارکت‌ها: ${error.message}`);
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
              بررسی مشارکت‌های کاربران
            </h1>

            <p className="text-sm text-muted-foreground">
              پیشنهادها و اصلاحات کاربران را پیش از انتشار بررسی کن.
            </p>
          </div>
        </header>

        <div className="flex items-center justify-between rounded-xl border bg-card p-4">
          <span className="text-sm text-muted-foreground">
            مشارکت‌های در انتظار بررسی
          </span>

          <span className="text-lg font-black tabular-nums">
            {contributions.length}
          </span>
        </div>

        {contributions.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <h2 className="font-bold">مشارکتی برای بررسی وجود ندارد</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              مشارکت‌های جدید کاربران در این بخش نمایش داده می‌شوند.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {contributions.map((contribution) => {
              const profile = Array.isArray(contribution.profile)
                ? contribution.profile[0]
                : contribution.profile;

              const contributorName =
                profile?.display_name || profile?.username || "کاربر ناشناس";

              return (
                <article
                  key={contribution.id}
                  className="space-y-5 rounded-2xl border bg-card p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 space-y-3">
                      <h2 className="wrap-break-word font-bold">
                        {contribution.subject}
                      </h2>

                      <div className="flex items-center gap-3">
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt=""
                            className="size-9 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                            {contributorName.charAt(0)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {contributorName}
                          </p>

                          {profile?.username && (
                            <p
                              className="truncate text-xs text-muted-foreground"
                              dir="ltr"
                            >
                              @{profile.username}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-600">
                      {contributionTypeLabels[contribution.type] ??
                        contribution.type}
                    </span>
                  </div>

                  <div className="whitespace-pre-wrap wrap-break-word text-sm leading-8">
                    {contribution.content}
                  </div>

                  {contribution.source_url && (
                    <div className="border-t pt-3">
                      <p className="mb-2 text-xs text-muted-foreground">
                        منبع پیشنهادی:
                      </p>

                      <a
                        href={contribution.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-sm text-orange-500 hover:underline"
                      >
                        {contribution.source_url}
                      </a>
                    </div>
                  )}

                  <div className="border-t pt-3 text-xs text-muted-foreground">
                    تاریخ ثبت:{" "}
                    {new Date(contribution.created_at).toLocaleString("fa-IR")}
                  </div>

                  <ContributionActions contributionId={contribution.id} />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
