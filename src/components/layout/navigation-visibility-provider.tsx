"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type NavigationVisibility = {
  isScrolled: boolean;
  isNavVisible: boolean;
};

const NavigationVisibilityContext = createContext<NavigationVisibility | null>(
  null,
);

export function NavigationVisibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
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

      if (Math.abs(delta) < 8) return;

      setIsNavVisible(delta < 0);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavigationVisibilityContext.Provider
      value={{
        isScrolled: scrollY > 24,
        isNavVisible,
      }}
    >
      {children}
    </NavigationVisibilityContext.Provider>
  );
}

export function useNavigationVisibility() {
  const context = useContext(NavigationVisibilityContext);

  if (!context) {
    throw new Error(
      "useNavigationVisibility must be used within NavigationVisibilityProvider",
    );
  }

  return context;
}
