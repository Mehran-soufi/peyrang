import { ArrowLeft, Sparkles } from "lucide-react";

import { BookCard } from "@/components/home/book-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const popularBooks = [
  {
    title: "سمفونی مردگان",
    author: "عباس معروفی",
    rating: 4.8,
    cover: "/assets/images/books/symphony-of-the-dead.jpg",
  },
  {
    title: "صد سال تنهایی",
    author: "گابریل گارسیا مارکز",
    rating: 4.7,
    cover: "/assets/images/books/one-hundred-years-of-solitude.jpg",
  },
  {
    title: "جنایت و مکافات",
    author: "فئودور داستایفسکی",
    rating: 4.6,
    cover: "/assets/images/books/crime-and-punishment.jpg",
  },
  {
    title: "کوری",
    author: "ژوزه ساراماگو",
    rating: 4.6,
    cover: "/assets/images/books/blindness.jpg",
  },
  {
    title: "بیگانه",
    author: "آلبر کامو",
    rating: 4.5,
    cover: "/assets/images/books/the-stranger.jpg",
  },
  {
    title: "ملت عشق",
    author: "الیف شافاک",
    rating: 4.5,
    cover: "/assets/images/books/the-forty-rules-of-love.jpg",
  },
  {
    title: "مردی به نام اوه",
    author: "فردریک بکمن",
    rating: 4.4,
    cover: "/assets/images/books/a-man-called-ove.jpg",
  },
  {
    title: "قلعه حیوانات",
    author: "جورج اورول",
    rating: 4.4,
    cover: "/assets/images/books/animal-farm.jpg",
  },
  {
    title: "۱۹۸۴",
    author: "جورج اورول",
    rating: 4.3,
    cover: "/assets/images/books/1984.jpg",
  },
  {
    title: "شازده کوچولو",
    author: "آنتوان دو سنت اگزوپری",
    rating: 4.3,
    cover: "/assets/images/books/the-little-prince.jpg",
  },
];

export function PopularBooks() {
  return (
    <section
      aria-labelledby="popular-books-title"
      className="relative overflow-hidden py-16 sm:py-20 w-full"
    >
      <div className="mx-auto w-[95%] min-w-0 px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Sparkles className="size-4" />

              <span className="text-xs font-semibold sm:text-sm">
                انتخاب کاربران
              </span>
            </div>

            <h2
              id="popular-books-title"
              className="text-2xl font-black tracking-tight sm:text-3xl"
            >
              کتاب‌های محبوب
            </h2>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              محبوب‌ترین کتاب‌ها بین کاربران پی‌رنگ
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
            <span>مشاهده همه</span>
            <ArrowLeft className="size-3.5" />
          </button>
        </div>

        {/* Books Carousel */}
        <div className="w-full min-w-0 max-w-full overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              dragFree: true,
              direction: "rtl",
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {popularBooks.map((book) => (
                <CarouselItem
                  key={book.title}
                  dir="rtl"
                  className="basis-38.75 pl-4 sm:basis-45 lg:basis-50"
                >
                  <BookCard {...book} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious
              className="size-9 cursor-pointer rounded-full border-orange-500/30 bg-orange-500/10
              text-foreground/70 opacity-60 shadow-lg backdrop-blur-md transition-all duration-300
              hover:border-orange-500/60 hover:bg-orange-500/60 hover:text-white hover:opacity-100
                 hover:shadow-orange-500/20 disabled:pointer-events-none disabled:opacity-0 sm:flex"
            />

            <CarouselNext
              className="size-9 cursor-pointer rounded-full border-orange-500/30 bg-orange-500/10
              text-foreground/70 opacity-60 shadow-lg backdrop-blur-md transition-all duration-300
              hover:border-orange-500/60 hover:bg-orange-500/60 hover:text-white hover:opacity-100
                 hover:shadow-orange-500/20 disabled:pointer-events-none disabled:opacity-0 sm:flex"
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
            <span>مشاهده همه کتاب‌ها</span>
            <ArrowLeft className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
