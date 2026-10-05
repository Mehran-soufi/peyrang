import Image from "next/image";
import { Star } from "lucide-react";

type BookCardProps = {
  title: string;
  author: string;
  rating: number;
  cover: string;
};

export function BookCard({ title, author, rating, cover }: BookCardProps) {
  return (
    <article className="group w-full min-w-0">
      <div
        className="
          relative aspect-2/3
          overflow-hidden
          rounded-2xl
          bg-muted
          shadow-sm
          ring-1 ring-black/5
          transition-all duration-300
          group-hover:-translate-y-1
          group-hover:shadow-xl
          group-hover:shadow-black/10
          dark:ring-white/10
          dark:group-hover:shadow-black/30
        "
      >
        {/* Cover */}
        <Image
          src={cover}
          alt={`جلد کتاب ${title}`}
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 22vw, 180px"
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-[1.04]
          "
        />

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 bottom-0 h-2/3
            bg-linear-to-t
            from-black/85
            via-black/35
            to-transparent
          "
        />

        {/* Rating */}
        <div
          className="
            absolute left-2.5 top-2.5
            flex items-center gap-1.5
            rounded-lg
            border border-white/15
            bg-black/55
            px-2.5 py-1.5
            text-[11px] font-semibold
            text-white
            shadow-lg
            backdrop-blur-md
          "
        >
          <Star className="size-3.5 fill-orange-400 text-orange-400" />
          <span>{rating.toFixed(1)}</span>
        </div>

        {/* Book Info */}
        <div
          className="
            absolute inset-x-0 bottom-0
            px-3 pb-3.5
            sm:px-3.5 sm:pb-4
          "
        >
          <h3
            className="
              truncate
              text-sm font-bold leading-6
              text-white
              transition-colors
              group-hover:text-orange-400
              sm:text-base
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-0.5
              truncate
              text-[11px] leading-5
              text-white/70
              sm:text-xs
            "
          >
            {author}
          </p>
        </div>
      </div>
    </article>
  );
}
