"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookHeart,
  MessageSquareText,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowLeft,
  BookOpen,
} from "lucide-react";

import { FavoriteBooks } from "@/features/profile/components/favorite-books";
import { toPersianNumber } from "@/lib/utils/format-number";
import type {
  ProfileFavorite,
  ProfileReview,
} from "@/lib/supabase/queries/profile";

type DashboardSection =
  | "favorites"
  | "reviews"
  | "approved"
  | "pending"
  | "rejected";

type ProfileDashboardProps = {
  reviews: ProfileReview[];
  favorites: ProfileFavorite[];
};

const statusLabels: Record<string, string> = {
  approved: "تأیید شده",
  pending: "در انتظار بررسی",
  rejected: "رد شده",
};

const cards = [
  {
    id: "favorites",
    title: "کتاب‌های محبوب",
    icon: BookHeart,
    description: "کتاب‌هایی که ذخیره کرده‌اید",
    color: "text-orange-500",
  },
  {
    id: "reviews",
    title: "نقدهای من",
    icon: MessageSquareText,
    description: "تمام نقدهای ثبت‌شده",
    color: "text-blue-500",
  },
  {
    id: "approved",
    title: "تأیید شده",
    icon: CheckCircle2,
    description: "نقدهای منتشرشده",
    color: "text-emerald-500",
  },
  {
    id: "pending",
    title: "در انتظار بررسی",
    icon: Clock3,
    description: "نقدهای در حال بررسی",
    color: "text-amber-500",
  },
  {
    id: "rejected",
    title: "رد شده",
    icon: XCircle,
    description: "نقدهای تأییدنشده",
    color: "text-red-500",
  },
] as const;

export function ProfileDashboard({
  reviews,
  favorites,
}: ProfileDashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection | null>(
    null,
  );

  const reviewCounts = {
    reviews: reviews.length,
    approved: reviews.filter((item) => item.status === "approved").length,
    pending: reviews.filter((item) => item.status === "pending").length,
    rejected: reviews.filter((item) => item.status === "rejected").length,
  };

  const visibleReviews =
    activeSection === "approved" ||
    activeSection === "pending" ||
    activeSection === "rejected"
      ? reviews.filter((review) => review.status === activeSection)
      : reviews;

  return (
    <section className="mt-8 space-y-6">
      <div>
        <h2 className="text-lg font-bold">فعالیت‌های من</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          کتاب‌ها و مشارکت‌های شما در پی‌رنگ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;

          const count =
            card.id === "favorites" ? favorites.length : reviewCounts[card.id];

          const isActive = activeSection === card.id;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveSection(isActive ? null : card.id)}
              aria-pressed={isActive}
              className={`group rounded-2xl border p-4 text-right transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${
                isActive
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                  : "border-border/60 bg-card/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`size-5 ${card.color}`} />
                <ArrowLeft
                  className={`size-4 transition-transform ${
                    isActive
                      ? "-rotate-45 text-primary"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              </div>

              <p className="mt-4 text-2xl font-bold tabular-nums">
                {toPersianNumber(count)}
              </p>

              <p className="mt-1 text-sm font-semibold">{card.title}</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>

      {activeSection && (
        <div
          key={activeSection}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">
                {cards.find((card) => card.id === activeSection)?.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeSection === "favorites"
                  ? `${toPersianNumber(favorites.length)} کتاب`
                  : `${toPersianNumber(visibleReviews.length)} نقد`}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveSection(null)}
              className="rounded-xl border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted"
            >
              بستن
            </button>
          </div>

          {activeSection === "favorites" ? (
            <div className="mt-4">
              <FavoriteBooks initialFavorites={favorites} />
            </div>
          ) : visibleReviews.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed p-8 text-center">
              <BookOpen className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">موردی برای نمایش وجود ندارد</p>
              <p className="mt-1 text-sm text-muted-foreground">
                با ثبت نقدهای جدید، این بخش به‌روزرسانی می‌شود.
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
              {visibleReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-border/60 bg-card/60 p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold">
                      {review.book ? (
                        <Link
                          href={`/books/${review.book.slug}`}
                          className="transition-colors hover:text-primary"
                        >
                          {review.book.title}
                        </Link>
                      ) : (
                        "کتاب"
                      )}
                    </h4>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {statusLabels[review.status] ?? review.status}
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
        </div>
      )}
    </section>
  );
}
