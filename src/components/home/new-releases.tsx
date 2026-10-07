import { Suspense } from "react";
import { BookOpen } from "lucide-react";

import { BookSection } from "@/components/home/book-section";
import { BookCardSkeleton } from "@/components/home/book-card-skeleton";
import { getBooks } from "@/lib/supabase/queries/books";

async function NewReleasesContent() {
  const books = await getBooks();

  const newReleases = books.map((book) => ({
    title: book.title,
    author: book.author,
    rating: null,
    cover: book.cover,
  }));

  return (
    <BookSection
      eyebrow="تازه در پی‌رنگ"
      title="تازه‌های کتاب"
      description="کتاب‌هایی که به‌تازگی به مجموعه پی‌رنگ اضافه شده‌اند"
      books={newReleases}
      icon={BookOpen}
    />
  );
}

function NewReleasesSkeleton() {
  return (
    <section
      aria-labelledby="new-releases-loading-title"
      className="relative w-full overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto w-[95%] min-w-0 px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <div className="mb-2 h-5 w-28 animate-pulse rounded-md bg-muted" />

          <div
            id="new-releases-loading-title"
            className="h-8 w-44 animate-pulse rounded-lg bg-muted sm:h-9"
          />

          <div className="mt-2 h-5 w-72 max-w-full animate-pulse rounded-md bg-muted" />
        </div>

        <div className="w-full min-w-0 max-w-full overflow-hidden">
          <div className="-ml-4 flex">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-38.75 shrink-0 pl-4 sm:w-45 lg:w-50"
              >
                <BookCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewReleases() {
  return (
    <Suspense fallback={<NewReleasesSkeleton />}>
      <NewReleasesContent />
    </Suspense>
  );
}