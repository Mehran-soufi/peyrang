"use client";

import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
import { SiteNavigation } from "@/components/layout/site-navigation";

import { useNavigationVisibility } from "@/components/layout/navigation-visibility-provider";

type PublicNavigationProps = {
  isAuthenticated: boolean;
};

export function PublicNavigation({ isAuthenticated }: PublicNavigationProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { isScrolled, isNavVisible } = useNavigationVisibility();

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
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
