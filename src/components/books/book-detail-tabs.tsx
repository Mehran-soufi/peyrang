"use client";

const tabs = [
  {
    id: "about",
    label: "معرفی کتاب",
  },
  {
    id: "reviews",
    label: "نقد و بررسی‌ها",
  },
  {
    id: "similar",
    label: "کتاب‌های مشابه",
  },
  {
    id: "author",
    label: "درباره نویسنده",
  },
];

import { useNavigationVisibility } from "@/components/layout/navigation-visibility-provider";

type BookDetailTabsProps = {
  activeTab: string;
  onChange: (tab: string) => void;
};

export function BookDetailTabs({ activeTab, onChange }: BookDetailTabsProps) {
  const { isScrolled, isNavVisible } = useNavigationVisibility();

  const isNavigationShowing = isScrolled && isNavVisible;

  return (
    <nav
      aria-label="بخش‌های کتاب"
      className={`
  sticky z-30
  ${isNavigationShowing ? "top-14 sm:top-29" : "top-14 sm:top-18"}
  border-b border-border/60
  bg-background/95
  shadow-sm
  overflow-x-auto scrollbar-none
  backdrop-blur-xl
  px-1 py-1.5 rounded-lg
`}
    >
      <div className="flex min-w-max items-center gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`
                relative
                whitespace-nowrap
                px-4 py-3
                text-sm font-medium
                transition-colors
                ${
                  isActive
                    ? "text-orange-500"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {tab.label}

              {isActive && (
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-x-3 bottom-0
                    h-0.5
                    rounded-full
                    bg-orange-500
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
