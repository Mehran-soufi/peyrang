import { CalendarDays, FileText, Globe2, Library } from "lucide-react";

import type { BookDetail as BookDetailData } from "@/lib/supabase/queries/books";

type BookMetaProps = {
  book: BookDetailData;
};

export function BookMeta({ book }: BookMetaProps) {
  const items = [
    {
      label: "سال انتشار",
      value: book.publicationYear,
      icon: CalendarDays,
    },
    {
      label: "تعداد صفحات",
      value: book.pageCount,
      icon: FileText,
    },
    {
      label: "زبان",
      value: book.language,
      icon: Globe2,
    },
  ].filter((item) => item.value);

  return (
    <section className="mx-auto w-[95%] max-w-6xl px-4 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="
              rounded-2xl
              border border-border/60
              bg-background/50
              p-4
              backdrop-blur-md
            "
          >
            <Icon className="size-5 text-orange-500" />

            <p className="mt-3 text-xs text-muted-foreground">{label}</p>

            <p className="mt-1 font-bold">{value}</p>
          </div>
        ))}

        <div
          className="
            rounded-2xl
            border border-border/60
            bg-background/50
            p-4
            backdrop-blur-md
            sm:hidden
          "
        >
          <Library className="size-5 text-orange-500" />
          <p className="mt-3 text-xs text-muted-foreground">نوع اثر</p>
          <p className="mt-1 font-bold">کتاب</p>
        </div>
      </div>
    </section>
  );
}
