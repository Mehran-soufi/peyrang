import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, UserRound } from "lucide-react";

import { PublicProfileDashboard } from "@/features/profile/components/public-profile-dashboard";
import {
  getPublicProfileByUsername,
  getPublicProfileFavorites,
  getPublicProfileReviews,
} from "@/lib/supabase/queries/public-profile";

type PublicProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;

  const profile = await getPublicProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const [reviews, favorites] = await Promise.all([
    profile.show_reviews
      ? getPublicProfileReviews(profile.id)
      : Promise.resolve([]),
    profile.show_favorites
      ? getPublicProfileFavorites(profile.id)
      : Promise.resolve([]),
  ]);

  const displayName = profile.display_name || profile.username;

  return (
    <main className="mx-auto w-[95%] max-w-5xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <section className="mb-8 rounded-3xl border bg-card/60 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={displayName ?? "تصویر پروفایل"}
                width={80}
                height={80}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              <UserRound className="size-9 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">
              {displayName || "کاربر پی‌رنگ"}
            </h1>

            {profile.username && (
              <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                @{profile.username}
              </p>
            )}

            {profile.bio && (
              <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-muted-foreground">
                {profile.bio}
              </p>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="size-4" />
              عضویت از{" "}
              {new Date(profile.created_at).toLocaleDateString("fa-IR")}
            </div>
          </div>
        </div>
      </section>

      <PublicProfileDashboard
        reviews={reviews}
        favorites={favorites}
        showReviews={profile.show_reviews}
        showFavorites={profile.show_favorites}
      />
    </main>
  );
}
