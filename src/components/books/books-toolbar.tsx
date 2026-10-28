"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type FilterOption = {
  id: string;
  name: string;
  slug: string;
};

type BooksToolbarProps = {
  genres: FilterOption[];
  authors: FilterOption[];
  languages: string[];
  minYear: number | null;
  maxYear: number | null;
};

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "highest_rating", label: "بالاترین امتیاز" },
  { value: "most_rated", label: "بیشترین رأی" },
  { value: "alphabetical", label: "ترتیب الفبایی" },
];

const selectClassName = "h-11 w-full rounded-xl bg-background";

function getLanguageLabel(language: string) {
  const labels: Record<string, string> = {
    fa: "فارسی",
    en: "انگلیسی",
    ru: "روسی",
    ar: "عربی",
    tr: "ترکی",
    fr: "فرانسوی",
    de: "آلمانی",
    es: "اسپانیایی",
    it: "ایتالیایی",
    zh: "چینی",
    ja: "ژاپنی",
    ko: "کره‌ای",
  };

  return labels[language.toLowerCase()] ?? language;
}

export function BooksToolbar({
  genres,
  authors,
  languages,
  minYear,
  maxYear,
}: BooksToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const [sort, setSort] = useState(() => searchParams.get("sort") ?? "newest");
  const [genre, setGenre] = useState(() => searchParams.get("genre") ?? "all");
  const [author, setAuthor] = useState(
    () => searchParams.get("author") ?? "all",
  );
  const [language, setLanguage] = useState(
    () => searchParams.get("language") ?? "all",
  );
  const [yearFrom, setYearFrom] = useState(
    () => searchParams.get("yearFrom") ?? "",
  );
  const [yearTo, setYearTo] = useState(() => searchParams.get("yearTo") ?? "");
  const [pageSize, setPageSize] = useState(
    () => searchParams.get("pageSize") ?? "12",
  );

  function applyFilters() {
    const from = yearFrom.trim();
    const to = yearTo.trim();

    if (
      (from && !/^\d{1,4}$/.test(from)) ||
      (to && !/^\d{1,4}$/.test(to)) ||
      (from && Number(from) <= 0) ||
      (to && Number(to) <= 0) ||
      (from && to && Number(from) > Number(to))
    ) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    const values: Record<string, string> = {
      sort: sort === "newest" ? "" : sort,
      genre: genre === "all" ? "" : genre,
      author: author === "all" ? "" : author,
      language: language === "all" ? "" : language,
      yearFrom: from,
      yearTo: to,
      pageSize: pageSize === "12" ? "" : pageSize,
    };

    for (const [key, value] of Object.entries(values)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    params.delete("page");

    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentQuery = searchParams.toString();
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

    if (nextUrl === currentUrl) {
      setPending(false);
      return;
    }

    setPending(true);
    router.push(nextUrl);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    [
      "sort",
      "genre",
      "author",
      "language",
      "yearFrom",
      "yearTo",
      "page",
      "pageSize",
    ].forEach((key) => params.delete(key));

    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentQuery = searchParams.toString();
    const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

    setSort("newest");
    setGenre("all");
    setAuthor("all");
    setLanguage("all");
    setYearFrom("");
    setYearTo("");
    setPageSize("12");

    if (nextUrl === currentUrl) {
      setPending(false);
      return;
    }

    setPending(true);
    router.push(nextUrl);
  }

  return (
    <section
      aria-label="مرتب‌سازی و فیلتر کتاب‌ها"
      className="mb-8 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block w-full sm:max-w-xs">
          <span className="mb-2 block text-sm font-semibold">
            مرتب‌سازی بر اساس
          </span>

          <Select
            value={sort}
            onValueChange={(value) => {
              if (value !== null) setSort(value);
            }}
          >
            <SelectTrigger className={selectClassName}>
              <span>
                {sortOptions.find((option) => option.value === sort)?.label ??
                  "انتخاب ترتیب"}
              </span>
            </SelectTrigger>

            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl sm:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            <SlidersHorizontal className="ml-2 size-4" />
            {open ? "بستن فیلترها" : "فیلترها"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="h-11 rounded-xl"
            onClick={clearFilters}
            disabled={pending}
          >
            <RotateCcw className="ml-2 size-4" />
            پاک‌کردن
          </Button>
        </div>
      </div>

      <div
        className={`${
          open ? "grid" : "hidden"
        } mt-5 grid-cols-1 gap-4 border-t border-border pt-5 sm:grid sm:grid-cols-2 lg:grid-cols-4`}
      >
        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium">ژانر</span>

          <Select
            value={genre}
            onValueChange={(value) => {
              if (value !== null) setGenre(value);
            }}
          >
            <SelectTrigger className={selectClassName}>
              <span>
                {genre === "all"
                  ? "همهٔ ژانرها"
                  : (genres.find((item) => item.slug === genre)?.name ??
                    "همهٔ ژانرها")}
              </span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">همهٔ ژانرها</SelectItem>
              {genres.map((item) => (
                <SelectItem key={item.id} value={item.slug}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium">نویسنده</span>

          <Select
            value={author}
            onValueChange={(value) => {
              if (value !== null) setAuthor(value);
            }}
          >
            <SelectTrigger className={selectClassName}>
              <span>
                {author === "all"
                  ? "همهٔ نویسندگان"
                  : (authors.find((item) => item.slug === author)?.name ??
                    "همهٔ نویسندگان")}
              </span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">همهٔ نویسندگان</SelectItem>
              {authors.map((item) => (
                <SelectItem key={item.id} value={item.slug}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="block min-w-0">
          <span className="mb-2 block text-sm font-medium">زبان</span>

          <Select
            value={language}
            onValueChange={(value) => {
              if (value !== null) setLanguage(value);
            }}
          >
            <SelectTrigger className={selectClassName}>
              <span>
                {language === "all"
                  ? "همهٔ زبان‌ها"
                  : getLanguageLabel(language)}
              </span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">همهٔ زبان‌ها</SelectItem>
              {languages.map((item) => (
                <SelectItem key={item} value={item}>
                  {getLanguageLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <div className="min-w-0">
          <span className="mb-2 block text-sm font-medium">سال انتشار</span>

          <div className="flex items-center gap-2">
            <input
              aria-label="از سال"
              type="number"
              inputMode="numeric"
              min={minYear ?? undefined}
              max={maxYear ?? undefined}
              placeholder="از سال"
              value={yearFrom}
              onChange={(event) => setYearFrom(event.target.value)}
              className="h-11 min-w-0 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <input
              aria-label="تا سال"
              type="number"
              inputMode="numeric"
              min={minYear ?? undefined}
              max={maxYear ?? undefined}
              placeholder="تا سال"
              value={yearTo}
              onChange={(event) => setYearTo(event.target.value)}
              className="h-11 min-w-0 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </div>

      <div className={`${open ? "flex" : "hidden"} mt-4 gap-2 sm:flex`}>
        <Button
          type="button"
          className="h-11 rounded-xl bg-orange-600 px-5 text-white hover:bg-orange-700"
          onClick={applyFilters}
          disabled={pending}
        >
          {pending ? "در حال اعمال..." : "اعمال فیلترها"}
        </Button>
      </div>
    </section>
  );
}
