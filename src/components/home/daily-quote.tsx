import { Quote as QuoteIcon } from "lucide-react";

import { quotes } from "@/components/home/quotes";

export default function DailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
      Date.UTC(today.getFullYear(), 0, 0)) /
      86400000,
  );

  const quote = quotes[dayOfYear % quotes.length];

  return (
    <section
      dir="rtl"
      aria-label="نقل قول روز"
      className="
        mx-auto w-[95%] max-w-6xl
        rounded-2xl
        border border-orange-500/20
        bg-background/60
        px-4 py-4
        shadow-md shadow-orange-500/10
        backdrop-blur-sm
        sm:px-5 sm:py-5
        lg:px-6
      "
    >
      <div
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-center sm:justify-between
          sm:gap-8
        "
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-orange-500/80 sm:text-sm">
            <QuoteIcon className="size-4 shrink-0" />
            <span>نقل قول روز از نویسندگان بزرگ</span>
          </div>

          <blockquote className="text-sm font-medium leading-7 text-foreground/90 sm:text-base sm:leading-8">
            «{quote.quote}»
          </blockquote>
        </div>

        <div className="shrink-0 border-t border-border/50 pt-3 sm:border-t-0 sm:border-s sm:ps-8 sm:pt-0">
          <p className="text-sm font-bold sm:text-base">{quote.author}</p>

          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {quote.role}
          </p>

          {quote.source && (
            <p className="mt-1 text-xs text-orange-500/70">
              {quote.source}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}