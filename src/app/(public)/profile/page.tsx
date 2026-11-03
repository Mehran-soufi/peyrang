import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";

import { ProfileDashboard } from "@/features/profile/components/profile-dashboard";
import { ProfileEditor } from "@/features/profile/components/profile-editor";
import { getMyFavorites, getMyReviews } from "@/lib/supabase/queries/profile";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const [{ data: profile, error: profileError }, reviews, favorites] =
    await Promise.all([
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
              <h1 className="text-xl font-bold sm:text-2xl">{displayName}</h1>

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

      <ProfileEditor
        username={profile?.username ?? ""}
        displayName={profile?.display_name ?? ""}
        avatarUrl={profile?.avatar_url ?? null}
        bio={profile?.bio ?? ""}
        email={user.email ?? ""}
        createdAt={profile?.created_at ?? user.created_at}
      />

      <ProfileDashboard reviews={reviews} favorites={favorites} />
    </div>
  );
}
