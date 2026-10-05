import Image from "next/image";
import { BookOpen, CalendarDays, MapPin } from "lucide-react";

type AuthorCardProps = {
  name: string;
  nationality: string;
  birthYear: number;
  deathYear?: number;
  booksCount: number;
  image: string;
};

export function AuthorCard({
  name,
  nationality,
  birthYear,
  deathYear,
  booksCount,
  image,
}: AuthorCardProps) {
  return (
    <article className="group w-full min-w-0">
      <div
        className="
          relative flex h-52 w-full overflow-hidden rounded-2xl
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
        {/* Author Image */}
        <div className="relative h-full w-[42%] shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 150px, 220px"
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
              bg-linear-to-l from-background/80 to-transparent
            "
          />
        </div>

        {/* Author Information */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
          <div className="min-w-0">
            <p className="mb-1 text-[11px] font-semibold text-orange-500/80">
              نویسنده
            </p>

            <h3
              className="
                truncate text-base font-black tracking-tight
                transition-colors duration-300
                group-hover:text-orange-500
              "
            >
              {name}
            </h3>
          </div>

          <div className="space-y-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 shrink-0 text-orange-500/80" />
              <span className="truncate">{nationality}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="size-3.5 shrink-0 text-orange-500/80" />
              <span dir="ltr">
                {birthYear}
                {deathYear ? ` — ${deathYear}` : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="size-3.5 shrink-0 text-orange-500/80" />
              <span>{booksCount} کتاب در پی‌رنگ</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}