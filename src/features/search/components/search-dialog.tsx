"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  Search,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

type SearchDialogProps = {
  trigger: React.ReactElement;
};

const quickSearches = [
  {
    label: "کتاب‌ها",
    icon: BookOpen,
    query: "کتاب",
  },
  {
    label: "نویسندگان",
    icon: UserRound,
    query: "نویسنده",
  },
  {
    label: "اقتباس‌ها",
    icon: Sparkles,
    query: "اقتباس",
  },
];

const popularSearches = [
  "جنایت و مکافات",
  "صد سال تنهایی",
  "شازده کوچولو",
  "1984",
];

type SearchResult = {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  author: string;
  ratingAverage: number | null;
  ratingCount: number;
};

export function SearchDialog({ trigger }: SearchDialogProps) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const trimmedQuery = query.trim();

  React.useEffect(() => {
    if (!open || !trimmedQuery) {
      setResults([]);
      setLoading(false);
      setSearchError(false);
      return;
    }

    let cancelled = false;

    const controller = new AbortController();

    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setSearchError(false);

      try {
        const response = await fetch(
          `/api/search/books?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data: { books: SearchResult[] } = await response.json();

        if (!cancelled) {
          setResults(data.books);
        }
      } catch (error) {
        if (
          !cancelled &&
          !(error instanceof Error && error.name === "AbortError")
        ) {
          setResults([]);
          setSearchError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [open, trimmedQuery]);

  const handleSearch = React.useCallback(() => {
    if (!trimmedQuery) {
      return;
    }

    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }, [router, trimmedQuery]);

  const handleQuickSearch = (value: string) => {
    setQuery(value);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />

      <DialogContent
        showCloseButton={false}
        className="
                  top-[8%]
                  w-[calc(100%-2rem)]
                  max-w-[calc(100%-2rem)]
                  translate-y-0
                  gap-0
                  overflow-hidden
                  rounded-2xl
                  border-border/70
                  bg-background/95
                  p-0
                  shadow-2xl
                  backdrop-blur-2xl
                  sm:top-[12%]
                  sm:w-[calc(100%-4rem)]
                  sm:max-w-4xl
  "
      >
        <DialogHeader className="sr-only">
          <DialogTitle>جستجو در پی‌رنگ</DialogTitle>
          <DialogDescription>
            جستجوی کتاب‌ها، نویسندگان و اقتباس‌های پی‌رنگ
          </DialogDescription>
        </DialogHeader>

        {/* Search header */}
        <div className="border-b border-border/60 p-3 sm:p-4">
          <div
            className="
              flex
              min-h-14
              items-center
              gap-3
              rounded-xl
              border
              border-border/70
              bg-muted/35
              px-4
              transition-colors
              focus-within:border-primary/50
              focus-within:bg-background
              focus-within:ring-2
              focus-within:ring-primary/10
            "
          >
            <Search
              aria-hidden="true"
              className="
                size-5
                shrink-0
                text-muted-foreground
              "
            />

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="کتاب، نویسنده یا اقتباس را جستجو کن..."
              aria-label="جستجو در پی‌رنگ"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70
    [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
            />

            {trimmedQuery ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="پاک کردن جستجو"
                className="
                  flex
                  size-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-muted-foreground
                  transition-colors
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                <X className="size-4" />
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleSearch}
              disabled={!trimmedQuery}
              className="h-10 cursor-pointer hidden shrink-0 items-center gap-1.5 rounded-lg
                bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:opacity-90
                disabled:pointer-events-none disabled:opacity-40 sm:flex"
            >
              جستجو
              <ArrowLeft className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[min(28rem,65vh)] overflow-y-auto p-4 sm:p-5">
          {!trimmedQuery ? (
            <div className="space-y-6">
              {/* Quick categories */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">جستجو در پی‌رنگ</h3>

                  <span className="text-xs text-muted-foreground">
                    انتخاب سریع
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {quickSearches.map(({ label, icon: Icon, query: value }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleQuickSearch(value)}
                      className="
                          group
                          flex
                          min-h-20
                          flex-col
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-border/60
                          bg-background/50
                          text-muted-foreground
                          transition-all
                          hover:border-primary/30
                          hover:bg-primary/5
                          hover:text-foreground
                        "
                    >
                      <span
                        className="
                            flex
                            size-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-muted
                            text-muted-foreground
                            transition-colors
                            group-hover:bg-primary/10
                            group-hover:text-primary
                          "
                      >
                        <Icon className="size-4" />
                      </span>

                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Popular searches */}
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <Clock3 className="size-4 text-muted-foreground" />

                  <h3 className="text-sm font-semibold">جستجوهای پیشنهادی</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleQuickSearch(item)}
                      className="
                        rounded-full
                        border
                        border-border/60
                        bg-muted/40
                        px-3
                        py-1.5
                        text-xs
                        text-muted-foreground
                        transition-colors
                        hover:border-primary/30
                        hover:bg-primary/5
                        hover:text-foreground
                      "
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              {/* Hint */}
              <div
                className="
                  rounded-xl
                  border
                  border-primary/10
                  bg-primary/[0.035]
                  px-4
                  py-3
                  text-center
                "
              >
                <p className="text-xs leading-6 text-muted-foreground">
                  نام یک کتاب، نویسنده یا اقتباس را وارد کن تا جستجو را شروع
                  کنیم.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search result header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">نتایج جستجو</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    جستجو برای «{trimmedQuery}»
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-lg
                    px-2.5
                    py-1.5
                    text-xs
                    font-medium
                    text-primary
                    transition-colors
                    hover:bg-primary/10
                  "
                >
                  مشاهده همه
                  <ArrowLeft className="size-3.5" />
                </button>
              </div>

              {/* Placeholder result groups */}

              {loading ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  در حال جست‌وجو...
                </p>
              ) : searchError ? (
                <p className="py-8 text-center text-sm text-destructive">
                  دریافت نتایج ناموفق بود. دوباره تلاش کن.
                </p>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((book) => (
                    <Link
                      target="_blank"
                      key={book.id}
                      href={`/books/${book.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BookOpen className="size-4" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {book.title}
                        </span>
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          {book.author}
                        </span>
                      </span>

                      {book.ratingAverage !== null && (
                        <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                          <span className="text-orange-500">★</span>
                          {book.ratingAverage.toFixed(1)}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  کتابی با این عبارت پیدا نشد.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-border/60
            bg-muted/20
            px-4
            py-2.5
            text-[11px]
            text-muted-foreground
            sm:px-5
          "
        >
          <span>برای جستجو Enter را بزن</span>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="
              rounded-md
              px-2
              py-1
              transition-colors
              hover:bg-muted
              hover:text-foreground
            "
          >
            بستن
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
