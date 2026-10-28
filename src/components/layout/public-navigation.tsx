
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
import { NavigationProgress } from "@/components/layout/navigation-progress";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { useNavigationVisibility } from "@/components/layout/navigation-visibility-provider";

export type AccountInfo = {
  displayName: string;
  username: string | null;
  role: string | null;
};

type PublicNavigationProps = {
  isAuthenticated: boolean;
  account: AccountInfo | null;
};

export function PublicNavigation({
  isAuthenticated,
  account,
}: PublicNavigationProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { isScrolled, isNavVisible } = useNavigationVisibility();

  return (
    <>
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>

      <Header
        isAuthenticated={isAuthenticated}
        account={account}
        isHome={isHome}
        isScrolled={isScrolled}
      />

      <SiteNavigation
        isHome={isHome}
        isScrolled={isScrolled}
        isVisible={isNavVisible}
      />
    </>
  );
}
