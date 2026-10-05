import type { LucideIcon } from "lucide-react";
import { ArrowLeft, LibraryBig } from "lucide-react";

import { AuthorCard } from "@/components/home/author-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Author = {
  name: string;
  nationality: string;
  birthYear: number;
  deathYear?: number;
  booksCount: number;
  image: string;
};

type AuthorSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  authors: Author[];
  icon?: LucideIcon;
  viewAllLabel?: string;
};

export function AuthorSection({
  eyebrow,
  title,
  description,
  authors,
  icon: Icon = LibraryBig,
  viewAllLabel = "مشاهده همه",
}: AuthorSectionProps) {
  return (
    <section
      aria-labelledby={`${title}-title`}
      className="relative w-full overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto w-[95%] min-w-0 px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Icon className="size-4" />

              <span className="text-xs font-semibold sm:text-sm">
                {eyebrow}
              </span>
            </div>

            <h2
              id={`${title}-title`}
              className="text-2xl font-black tracking-tight sm:text-3xl"
            >
              {title}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>

          <button
            type="button"
            className="
              hidden shrink-0 items-center gap-1.5
              rounded-xl
              border border-border/60
              bg-background/60
              px-3.5 py-2
              text-xs font-semibold
              text-muted-foreground
              shadow-sm
              backdrop-blur-sm
              transition-all
              hover:border-primary/30
              hover:bg-primary/5
              hover:text-primary
              sm:inline-flex
            "
          >
            <span>{viewAllLabel}</span>
            <ArrowLeft className="size-3.5" />
          </button>
        </div>

        {/* Authors Carousel */}
        <div className="w-full min-w-0 max-w-full overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
              direction: "rtl",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {authors.map((author) => (
                <CarouselItem
                  key={author.name}
                  dir="rtl"
                  className="basis-80 pl-4 sm:basis-96 lg:basis-105"
                >
                  <AuthorCard {...author} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious
              className="
                size-9 cursor-pointer rounded-full border-orange-500/30
                bg-orange-500/10 text-foreground/70 opacity-60
                shadow-lg backdrop-blur-md transition-all duration-300
                hover:border-orange-500/60 hover:bg-orange-500/60
                hover:text-white hover:opacity-100
                hover:shadow-orange-500/20
                disabled:pointer-events-none disabled:opacity-0
                sm:flex
              "
            />

            <CarouselNext
              className="
                size-9 cursor-pointer rounded-full border-orange-500/30
                bg-orange-500/10 text-foreground/70 opacity-60
                shadow-lg backdrop-blur-md transition-all duration-300
                hover:border-orange-500/60 hover:bg-orange-500/60
                hover:text-white hover:opacity-100
                hover:shadow-orange-500/20
                disabled:pointer-events-none disabled:opacity-0
                sm:flex
              "
            />
          </Carousel>
        </div>

        {/* Mobile View All */}
        <div className="mt-6 flex justify-center sm:hidden">
          <button
            type="button"
            className="
              inline-flex items-center gap-1.5
              rounded-xl
              border border-border/60
              bg-background/60
              px-4 py-2.5
              text-xs font-semibold
              text-muted-foreground
              shadow-sm
              backdrop-blur-sm
              transition-all
              hover:border-primary/30
              hover:bg-primary/5
              hover:text-primary
            "
          >
            <span>{viewAllLabel} نویسندگان</span>
            <ArrowLeft className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}