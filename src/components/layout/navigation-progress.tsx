"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const query = useSearchParams().toString();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const wasLoading = useRef(false);
  const advanceTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function clearTimers() {
      if (advanceTimer.current) clearInterval(advanceTimer.current);
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      advanceTimer.current = null;
      fallbackTimer.current = null;
      hideTimer.current = null;
    }

    function startProgress() {
      clearTimers();
      wasLoading.current = true;
      setIsLoading(true);
      setProgress(12);

      advanceTimer.current = setInterval(() => {
        setProgress((current) => Math.min(current + (90 - current) * 0.12, 90));
      }, 180);

      // Query-only navigations do not change usePathname, so avoid leaving the
      // indicator visible if the router finishes without a path change.
      fallbackTimer.current = setTimeout(() => finishProgress(), 5000);
    }

    function finishProgress() {
      if (advanceTimer.current) clearInterval(advanceTimer.current);
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      advanceTimer.current = null;
      fallbackTimer.current = null;
      wasLoading.current = false;
      setProgress(100);
      hideTimer.current = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 240);
    }

    function handleDocumentClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.getAttribute("aria-disabled") === "true"
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      startProgress();
    }

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (wasLoading.current) {
      if (advanceTimer.current) clearInterval(advanceTimer.current);
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      advanceTimer.current = null;
      fallbackTimer.current = null;
      wasLoading.current = false;
      setProgress(100);
      hideTimer.current = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 240);
    }
  }, [pathname, query]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 transition-opacity duration-200 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full bg-primary shadow-sm shadow-primary/50 transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
