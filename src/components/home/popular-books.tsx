import { Sparkles } from "lucide-react";

import { BookSection } from "@/components/home/book-section";

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
    cover: "/assets/images/books/a-man-called-ove.webp",
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
    cover: "/assets/images/books/1984.webp",
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
    <BookSection
      eyebrow="انتخاب کاربران"
      title="کتاب‌های محبوب"
      description="محبوب‌ترین کتاب‌ها بین کاربران پی‌رنگ"
      books={popularBooks}
      icon={Sparkles}
    />
  );
}
