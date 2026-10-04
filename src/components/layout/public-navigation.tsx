"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
import { SiteNavigation } from "@/components/layout/site-navigation";

type PublicNavigationProps = {
  isAuthenticated: boolean;
};

export function PublicNavigation({ isAuthenticated }: PublicNavigationProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrollY, setScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);

      if (currentScrollY <= 24) {
        setIsNavVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) < 8) {
        return;
      }

      if (delta > 0) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolled = scrollY > 24;

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
