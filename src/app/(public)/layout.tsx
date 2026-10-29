
import { Suspense } from "react";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { Footer } from "@/components/layout/footer";
import { PublicNavigation } from "@/components/layout/public-navigation";
import { PublicNavigationData } from "@/components/layout/public-navigation-data";
import { Toaster } from "@/components/ui/sonner";
import { NavigationVisibilityProvider } from "@/components/layout/navigation-visibility-provider";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col pb-24 sm:pb-0">
      <AmbientBackground />

      <Toaster />

      <NavigationVisibilityProvider>
        <Suspense
          fallback={
            <PublicNavigation
              isAuthenticated={false}
              account={null}
              accountPending
            />
          }
        >
          <PublicNavigationData />
        </Suspense>

        <main className="flex-1">{children}</main>
      </NavigationVisibilityProvider>

      <Footer />

    </div>
  );
}
