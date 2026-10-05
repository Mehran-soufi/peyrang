import { BookOpen } from "lucide-react";

import { BookSection } from "@/components/home/book-section";

const newReleases = [
  {
    title: "اتاق",
    author: "اما داناهیو",
    rating: 4.4,
    cover: "/assets/images/books/room.jpg",
  },
  {
    title: "پیرمرد و دریا",
    author: "ارنست همینگوی",
    rating: 4.3,
    cover: "/assets/images/books/the-old-man-and-the-sea.jpg",
  },
  {
    title: "مزرعه حیوانات",
    author: "جورج اورول",
    rating: 4.2,
    cover: "/assets/images/books/animal-farm.jpg",
  },
  {
    title: "کیمیاگر",
    author: "پائولو کوئیلو",
    rating: 4.5,
    cover: "/assets/images/books/the-alchemist.jpg",
  },
  {
    title: "جزء از کل",
    author: "استیو تولتز",
    rating: 4.4,
    cover: "/assets/images/books/a-fraction-of-the-whole.jpg",
  },
  {
    title: "سووشون",
    author: "سیمین دانشور",
    rating: 4.6,
    cover: "/assets/images/books/savushun.jpg",
  },
  {
    title: "چشم‌هایش",
    author: "بزرگ علوی",
    rating: 4.5,
    cover: "/assets/images/books/her-eyes.jpg",
  },
  {
    title: "چراغ‌ها را من خاموش می‌کنم",
    author: "زویا پیرزاد",
    rating: 4.4,
    cover: "/assets/images/books/i-will-turn-off-the-lights.jpg",
  },
  {
    title: "دایی جان ناپلئون",
    author: "ایرج پزشکزاد",
    rating: 4.3,
    cover: "/assets/images/books/my-uncle-napoleon.jpg",
  },
  {
    title: "پاییز فصل آخر سال است",
    author: "نسیم مرعشی",
    rating: 4.2,
    cover: "/assets/images/books/autumn-is-the-last-season.jpg",
  },
];

export function NewReleases() {
  return (
    <BookSection
      eyebrow="تازه‌های پی‌رنگ"
      title="تازه‌های پی‌رنگ"
      description="جدیدترین کتاب‌های اضافه‌شده به پی‌رنگ"
      books={newReleases}
      icon={BookOpen}
    />
  );
}
