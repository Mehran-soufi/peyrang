import Image from "next/image";
import { BookOpen, CalendarDays, Clock3, Star } from "lucide-react";

type AdaptationCardProps = {
  title: string;
  year: number;
  rating: number;
  duration: string;
  bookTitle: string;
  author: string;
  poster: string;
};

export function AdaptationCard({
  title,
  year,
  rating,
  duration,
  bookTitle,
  author,
  poster,
}: AdaptationCardProps) {
  return (
    <article className="group w-full min-w-0">
      <div
        className="
          relative flex h-60 w-full overflow-hidden rounded-2xl
          border border-border/60
          bg-background/70
          shadow-sm
          backdrop-blur-sm
          transition-all duration-300
          group-hover:-translate-y-1
          group-hover:border-orange-500/30
          group-hover:shadow-xl
          group-hover:shadow-orange-500/10
        "
      >
        {/* Poster */}
        <div className="relative h-full w-1/2 shrink-0 overflow-hidden">
          <Image
            src={poster}
            alt={`پوستر فیلم ${title}`}
            fill
            sizes="(max-width: 640px) 140px, 200px"
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-[1.04]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute inset-y-0 right-0 w-1/3
              bg-linear-to-l from-background/90 to-transparent
            "
          />
        </div>

        {/* Film Information */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
          <div className="min-w-0">
            <p className="mb-1 text-[11px] font-semibold text-orange-500/80">
              اقتباس سینمایی
            </p>

            <h3
              className="
                truncate text-base font-black tracking-tight
                transition-colors duration-300
                group-hover:text-orange-500
              "
            >
              {title}
            </h3>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {year}
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-muted-foreground">
            <div className="flex min-w-0 items-center gap-2">
              <BookOpen className="size-3.5 shrink-0 text-orange-500/80" />

              <span className="truncate">
                اقتباس از «{bookTitle}»
              </span>
            </div>

            <p className="truncate pr-5 text-[11px] text-muted-foreground/80">
              {author}
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Star className="size-3.5 fill-orange-400 text-orange-400" />
                <span>{rating.toFixed(1)}</span>
              </span>

              <span className="inline-flex items-center gap-1">
                <Clock3 className="size-3.5 text-orange-500/80" />
                <span>{duration}</span>
              </span>

              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5 text-orange-500/80" />
                <span>{year}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}