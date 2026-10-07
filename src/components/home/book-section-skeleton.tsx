import { BookCardSkeleton } from "@/components/home/book-card-skeleton";

type BookSectionSkeletonProps = {
  count?: number;
};

export function BookSectionSkeleton({
  count = 5,
}: BookSectionSkeletonProps) {
  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto w-[95%] min-w-0 px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div className="w-full max-w-md space-y-3">
            <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-48 animate-pulse rounded-md bg-muted sm:h-9" />
            <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="hidden h-9 w-24 animate-pulse rounded-xl bg-muted sm:block" />
        </div>

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="w-38.75 shrink-0 sm:w-45 lg:w-50"
            >
              <BookCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}