"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type BookRatingProps = {
  bookId: string;
  mode: "summary" | "interactive";
};

type RatingRow = {
  user_id: string;
  rating: number;
};

type ReviewRow = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
};

type ReviewAuthor = {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
};

export function BookRating({ bookId, mode }: BookRatingProps) {
  const router = useRouter();

  const [ratings, setRatings] = useState<RatingRow[]>([]);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [reviewAuthors, setReviewAuthors] = useState<
    Record<string, ReviewAuthor>
  >({});
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingRating, setIsSavingRating] = useState(false);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
      setIsAuthLoading(false);
      setRefreshKey((current) => current + 1);
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setErrorMessage("بررسی وضعیت ورود با مشکل مواجه شد.");
      } else {
        setUserId(data.session?.user?.id ?? null);
      }

      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setIsLoading(true);
      setErrorMessage("");

      const supabase = createClient();

      const [
        { data: authData, error: authError },
        { data: ratingData, error: ratingError },
        { data: reviewData, error: reviewError },
      ] = await Promise.all([
        supabase.auth.getSession(),
        supabase
          .from("ratings")
          .select("user_id, rating")
          .eq("book_id", bookId),
        supabase
          .from("reviews")
          .select("id, user_id, content, created_at, status")
          .eq("book_id", bookId)
          .order("created_at", { ascending: false }),
      ]);

      if (cancelled) return;

      if (authError || ratingError || reviewError) {
        console.error("Book rating/review load errors:", {
          authError,
          ratingError,
          reviewError,
        });

        setErrorMessage("دریافت اطلاعات امتیاز و نقدها با مشکل مواجه شد.");
        setIsLoading(false);
        return;
      }

      const currentUserId = authData.session?.user?.id ?? null;
      const ratingRows = (ratingData ?? []) as RatingRow[];
      const reviewRows = (reviewData ?? []) as ReviewRow[];

      const currentRating = currentUserId
        ? (ratingRows.find((item) => item.user_id === currentUserId)?.rating ??
          0)
        : 0;

      const authorIds = [
        ...new Set(reviewRows.map((review) => review.user_id)),
      ];

      const { data: authorData, error: authorError } =
        authorIds.length > 0
          ? await supabase.rpc("get_public_review_authors", {
              author_ids: authorIds,
            })
          : { data: [], error: null };

      if (cancelled) return;

      if (authorError) {
        console.error("Review authors load error:", authorError);
      }

      const authorMap: Record<string, ReviewAuthor> = {};

      for (const author of (authorData ?? []) as ReviewAuthor[]) {
        authorMap[author.id] = author;
      }

      setUserId(currentUserId);
      setRatings(ratingRows);
      setReviews(reviewRows);
      setReviewAuthors(authorMap);
      setUserRating(currentRating);
      setSelectedRating(currentRating);
      setIsLoading(false);
    }

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [bookId, refreshKey]);

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((total, item) => total + item.rating, 0) / ratings.length
      : 0;

  const approvedReviewCount = reviews.filter(
    (review) => review.status === "approved",
  ).length;

  async function handleSaveRating() {
    if (selectedRating < 1 || selectedRating > 5) {
      setErrorMessage("لطفاً امتیازی بین ۱ تا ۵ ستاره انتخاب کنید.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSavingRating(true);

    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setIsSavingRating(false);
      setUserId(null);
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("ratings").upsert(
      {
        user_id: user.id,
        book_id: bookId,
        rating: selectedRating,
      },
      { onConflict: "user_id,book_id" },
    );

    setIsSavingRating(false);

    if (error) {
      console.error("Save rating error:", error);
      setErrorMessage("ثبت امتیاز انجام نشد. لطفاً دوباره تلاش کنید.");
      return;
    }

    setUserId(user.id);
    setUserRating(selectedRating);
    setSuccessMessage("امتیاز شما با موفقیت ثبت شد.");
    setRefreshKey((current) => current + 1);
    router.refresh();
  }

  async function handleSaveReview() {
    const content = reviewContent.trim();

    if (selectedRating < 1 || selectedRating > 5) {
      setErrorMessage("برای ثبت نقد، ابتدا امتیاز کتاب را انتخاب کنید.");
      return;
    }

    if (content.length < 20) {
      setErrorMessage("نقد شما باید حداقل ۲۰ نویسه داشته باشد.");
      return;
    }

    if (content.length > 3000) {
      setErrorMessage("متن نقد نمی‌تواند بیشتر از ۳۰۰۰ نویسه باشد.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSavingReview(true);

    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setIsSavingReview(false);
      setUserId(null);
      router.push("/login");
      return;
    }

    // ابتدا امتیاز را ذخیره یا به‌روزرسانی می‌کنیم.
    const { error: ratingError } = await supabase.from("ratings").upsert(
      {
        user_id: user.id,
        book_id: bookId,
        rating: selectedRating,
      },
      { onConflict: "user_id,book_id" },
    );

    if (ratingError) {
      console.error("Save review rating error:", ratingError);
      setIsSavingReview(false);
      setErrorMessage("ثبت امتیاز انجام نشد؛ نقد شما ثبت نشد.");
      return;
    }

    setUserId(user.id);
    setUserRating(selectedRating);

    const { error: reviewError } = await supabase.from("reviews").insert({
      user_id: user.id,
      book_id: bookId,
      content,
      status: "pending",
    });

    setIsSavingReview(false);

    if (reviewError) {
      console.error("Save review error:", reviewError);
      setErrorMessage(
        "امتیاز شما ذخیره شد، اما ثبت نقد انجام نشد. لطفاً دوباره تلاش کنید.",
      );
      setRefreshKey((current) => current + 1);
      return;
    }

    setReviewContent("");
    setSuccessMessage("نقد شما ثبت شد و پس از بررسی و تأیید منتشر خواهد شد.");
    setRefreshKey((current) => current + 1);
    router.refresh();
  }

  return (
    <section className="w-full min-w-0">
      <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur-md sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-orange-500" />
              <h2 className="text-xl font-black">
                {mode === "summary" ? "امتیاز کتاب" : "امتیاز و نقدها"}
              </h2>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "summary"
                ? "امتیاز کاربران به این کتاب"
                : "امتیاز و دیدگاه خود را درباره این کتاب ثبت کنید."}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Star className="size-5 fill-orange-500 text-orange-500" />
                <span className="text-2xl font-black">
                  {isLoading
                    ? "…"
                    : averageRating > 0
                      ? averageRating.toLocaleString("fa-IR", {
                          maximumFractionDigits: 1,
                        })
                      : "—"}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {isLoading
                  ? "در حال بارگذاری"
                  : ratings.length > 0
                    ? `${ratings.length.toLocaleString("fa-IR")} رأی`
                    : "بدون امتیاز"}
              </p>
            </div>

            {mode === "interactive" && (
              <>
                <div className="h-10 w-px bg-border/60" />
                <div className="text-center">
                  <p className="text-2xl font-black">
                    {isLoading
                      ? "…"
                      : approvedReviewCount.toLocaleString("fa-IR")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    نقد تأییدشده
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {userRating > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            امتیاز فعلی شما: {userRating.toLocaleString("fa-IR")} از ۵
          </p>
        )}

        {mode === "interactive" && (
          <>
            <div className="mt-8 rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6">
              <h3 className="font-bold">امتیاز شما به این کتاب</h3>

              <div
                className="mt-4 flex items-center gap-2"
                dir="ltr"
                aria-label="انتخاب امتیاز از یک تا پنج ستاره"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    disabled={
                      isLoading ||
                      isAuthLoading ||
                      isSavingRating ||
                      isSavingReview ||
                      !userId
                    }
                    onClick={() => {
                      setSelectedRating(rating);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    aria-label={`${rating} ستاره`}
                    aria-pressed={selectedRating === rating}
                    className="rounded-md p-1 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    <Star
                      className={`size-7 transition-colors ${
                        rating <= selectedRating
                          ? "fill-orange-500 text-orange-500"
                          : "text-muted-foreground/50"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (!userId) {
                      router.push("/login");
                      return;
                    }

                    void handleSaveRating();
                  }}
                  disabled={
                    isLoading ||
                    isSavingRating ||
                    !userId ||
                    selectedRating === 0 ||
                    selectedRating === userRating
                  }
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSavingRating
                    ? "در حال ثبت..."
                    : !userId
                      ? "ورود برای ثبت امتیاز"
                      : userRating > 0
                        ? "ویرایش امتیاز"
                        : "ثبت امتیاز"}
                </button>

                {!userId && !isAuthLoading && (
                  <p className="text-xs text-muted-foreground">
                    برای ثبت امتیاز باید وارد حساب کاربری شوید.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold">نقد و بررسی شما</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                تجربه و دیدگاه خود را درباره این کتاب با دیگران به اشتراک
                بگذارید. نقد شما قبل از انتشار بررسی می‌شود.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                برای ارسال نقد، انتخاب امتیاز از ۱ تا ۵ ستاره الزامی است.
              </p>

              <textarea
                value={reviewContent}
                onChange={(event) => {
                  setReviewContent(event.target.value);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                maxLength={3000}
                rows={6}
                placeholder="نقد خود را اینجا بنویسید..."
                disabled={isSavingReview}
                className="mt-4 w-full resize-y rounded-xl border border-border/70 bg-background/60 p-4 text-sm leading-7 outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500/20 disabled:opacity-60"
              />

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  حداقل ۲۰ و حداکثر ۳۰۰۰ نویسه
                </p>
                <p className="text-xs text-muted-foreground">
                  {reviewContent.length.toLocaleString("fa-IR")} / ۳۰۰۰
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!userId) {
                    router.push("/login");
                    return;
                  }

                  void handleSaveReview();
                }}
                disabled={
                  isLoading ||
                  isSavingReview ||
                  !userId ||
                  selectedRating < 1 ||
                  reviewContent.trim().length < 20
                }
                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSavingReview
                  ? "در حال ارسال..."
                  : !userId
                    ? "ورود برای ثبت نقد"
                    : "ارسال نقد برای بررسی"}
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold">نقدهای کاربران</h3>

              {isLoading ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  در حال بارگذاری نقدها...
                </p>
              ) : reviews.length === 0 ? (
                <p className="mt-4 rounded-xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
                  هنوز نقدی برای این کتاب ثبت نشده است.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-xl border border-border/60 bg-background/40 p-4 sm:p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-3">
                         <div className="flex min-w-0 items-center gap-2">
  {reviewAuthors[review.user_id]?.avatar_url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={reviewAuthors[review.user_id].avatar_url!}
      alt=""
      className="size-9 shrink-0 rounded-full border border-border/60 object-cover"
    />
  ) : (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-600">
      {(reviewAuthors[review.user_id]?.display_name ||
        reviewAuthors[review.user_id]?.username ||
        "ک")[0].toLocaleUpperCase("fa-IR")}
    </div>
  )}

  <p className="truncate text-sm font-bold">
    {reviewAuthors[review.user_id]?.display_name ||
      reviewAuthors[review.user_id]?.username ||
      "کاربر پی‌رنگ"}
  </p>
</div>

                          {(() => {
                            const reviewRating = ratings.find(
                              (item) => item.user_id === review.user_id,
                            )?.rating;

                            return reviewRating ? (
                              <div
                                className="flex items-center gap-1.5 text-sm"
                                aria-label={`امتیاز ${reviewRating} از ۵`}
                              >
                                <Star className="size-4 fill-orange-500 text-orange-500" />
                                <span className="font-bold">
                                  {reviewRating.toLocaleString("fa-IR")}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  از ۵
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                بدون امتیاز
                              </span>
                            );
                          })()}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {review.status !== "approved" && (
                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                              {review.status === "pending"
                                ? "در انتظار تأیید"
                                : "تأیید نشده"}
                            </span>
                          )}

                          <time
                            dateTime={review.created_at}
                            className="text-xs text-muted-foreground"
                          >
                            {new Date(review.created_at).toLocaleDateString(
                              "fa-IR",
                            )}
                          </time>
                        </div>
                      </div>

                      <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-foreground/90">
                        {review.content}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {errorMessage && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p role="status" className="mt-4 text-sm text-green-600">
            {successMessage}
          </p>
        )}
      </div>
    </section>
  );
}
