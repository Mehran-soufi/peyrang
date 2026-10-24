
import { AmbientBackground } from "@/components/layout/ambient-background";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicNavigation } from "@/components/layout/public-navigation";
import { Toaster } from "@/components/ui/sonner";
import { NavigationVisibilityProvider } from "@/components/layout/navigation-visibility-provider";
import { createClient } from "@/lib/supabase/server";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);
  let account = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, username, role")
      .eq("id", user.id)
      .maybeSingle();

    account = {
      displayName:
        profile?.display_name ||
        profile?.username ||
        user.email?.split("@")[0] ||
        "حساب کاربری",
      username: profile?.username ?? null,
      role: profile?.role ?? null,
    };
  }

  return (
    <div className="relative flex min-h-screen flex-col pb-24 sm:pb-0">
      <AmbientBackground />

      <Toaster />

      <NavigationVisibilityProvider>
        <PublicNavigation
          isAuthenticated={isAuthenticated}
          account={account}
        />

        <main className="flex-1">{children}</main>
      </NavigationVisibilityProvider>

      <Footer />

      <MobileBottomNav isAuthenticated={isAuthenticated} />
    </div>
  );
}
