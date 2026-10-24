
"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
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
