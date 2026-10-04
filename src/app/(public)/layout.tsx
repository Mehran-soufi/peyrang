import { AmbientBackground } from "@/components/layout/ambient-background";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { PublicNavigation } from "@/components/layout/public-navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const isAuthenticated = Boolean(data?.claims);

  return (
    <div className="relative flex min-h-screen flex-col pb-24 sm:pb-0">
      <AmbientBackground />

      <PublicNavigation isAuthenticated={isAuthenticated} />

      <main className="flex-1">{children}</main>

      <Footer />

      <MobileBottomNav isAuthenticated={isAuthenticated} />
    </div>
  );
}
