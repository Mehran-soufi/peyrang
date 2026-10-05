import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Clapperboard } from "lucide-react";

import { AdaptationCard } from "@/components/home/adaptation-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Adaptation = {
  title: string;
  year: number;
  rating: number;
  duration: string;
  bookTitle: string;
  author: string;
  poster: string;
};

type AdaptationSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  adaptations: Adaptation[];
  icon?: LucideIcon;
  viewAllLabel?: string;
};

export function AdaptationSection({
  eyebrow,
  title,
  description,
  adaptations,
  icon: Icon = Clapperboard,
  viewAllLabel = "مشاهده همه",
}: AdaptationSectionProps) {
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

        {/* Adaptations Carousel */}
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
              {adaptations.map((adaptation) => (
                <CarouselItem
                  key={`${adaptation.title}-${adaptation.year}`}
                  dir="rtl"
                  className="basis-90 pl-4 sm:basis-105 lg:basis-120"
                >
                  <AdaptationCard {...adaptation} />
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
            <span>{viewAllLabel} اقتباس‌ها</span>
            <ArrowLeft className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}