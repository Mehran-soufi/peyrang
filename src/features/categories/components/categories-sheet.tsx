"use client";

import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  Clapperboard,
  History,
  Search,
  Skull,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const siteCategories = [
  {
    href: "/books",
    label: "همه کتاب‌ها",
    description: "مشاهده مجموعه کتاب‌های پی‌رنگ",
    icon: BookOpen,
  },
  {
    href: "/authors",
    label: "نویسندگان",
    description: "آشنایی با نویسندگان",
    icon: UserRound,
  },
  {
    href: "/adaptations",
    label: "اقتباس‌ها",
    description: "کتاب‌هایی که به فیلم و سریال تبدیل شده‌اند",
    icon: Clapperboard,
  },
];

const genreCategories = [
  {
    href: "/books?genre=داستانی",
    label: "داستانی",
    icon: Sparkles,
  },
  {
    href: "/books?genre=جنایی",
    label: "جنایی",
    icon: Skull,
  },
  {
    href: "/books?genre=ترسناک",
    label: "ترسناک",
    icon: Skull,
  },
  {
    href: "/books?genre=تاریخی",
    label: "تاریخی",
    icon: History,
  },
  {
    href: "/books?genre=خودشناسی",
    label: "خودشناسی",
    icon: Sparkles,
  },
];

type CategoriesSheetProps = {
  trigger: React.ReactElement;
};

export function CategoriesSheet({ trigger }: CategoriesSheetProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />

      <DialogContent
        showCloseButton={false}
        className="
  top-auto
  bottom-4
  left-4
  w-[calc(100%-2rem)]
  max-w-none
  translate-x-0
  translate-y-0
  gap-0
  overflow-hidden
  rounded-3xl
  border-border/70
  bg-background/95
  p-0
  shadow-2xl
  backdrop-blur-2xl
  sm:top-[50%]
  sm:bottom-auto
  sm:left-[50%]
  sm:w-[calc(100%-2rem)]
  sm:max-w-2xl
  sm:translate-x-[-50%]
  sm:translate-y-[-50%]
  sm:rounded-2xl
"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <DialogTitle className="text-base font-bold">
              دسته‌بندی‌های پی‌رنگ
            </DialogTitle>

            <p className="mt-1 text-xs text-muted-foreground">
              کتاب بعدی‌ات را از اینجا پیدا کن
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="بستن"
            className="
              flex size-9 items-center justify-center
              rounded-full
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          <div className="mb-5">
            <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
              بخش‌های پی‌رنگ
            </p>

            <div className="grid gap-2">
              {siteCategories.map(
                ({ href, label, description, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="
                      group flex items-center gap-3
                      rounded-2xl border
                      bg-background/60
                      p-3.5
                      transition-colors
                      hover:border-primary/30
                      hover:bg-primary/5
                    "
                  >
                    <span
                      className="
                        flex size-10 shrink-0 items-center justify-center
                        rounded-xl
                        bg-primary/10
                        text-primary
                      "
                    >
                      <Icon className="size-5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">
                        {label}
                      </span>

                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {description}
                      </span>
                    </span>

                    <ChevronLeft
                      className="
                        size-4 shrink-0
                        text-muted-foreground
                        transition-transform
                        group-hover:-translate-x-0.5
                      "
                    />
                  </Link>
                ),
              )}
            </div>
          </div>

          <div>
            <p className="mb-2 px-1 text-xs font-semibold text-muted-foreground">
              ژانرهای محبوب
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {genreCategories.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center gap-2
                    rounded-xl border
                    px-3 py-3
                    text-sm font-medium
                    transition-colors
                    hover:border-primary/30
                    hover:bg-primary/5
                  "
                >
                  <Icon className="size-4 text-primary" />

                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-muted/50 p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Search className="size-4 shrink-0" />

              <span>
                دنبال عنوان یا نویسنده خاصی هستی؟ از جستجو استفاده کن.
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
