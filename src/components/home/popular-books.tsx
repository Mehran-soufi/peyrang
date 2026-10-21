import { Sparkles } from "lucide-react";

import { BookSection } from "@/components/home/book-section";
import { getPopularBooks } from "@/lib/supabase/queries/books";

export async function PopularBooks() {
  const books = await getPopularBooks();

  const popularBooks = books.map((book) => ({
    id: book.id,
    slug: book.slug,
    title: book.title,
    author: book.author,
    rating: book.ratingAverage,
    cover: book.cover,
  }));
  return (
    <BookSection
      eyebrow="انتخاب کاربران"
      title="کتاب‌های محبوب"
      description="محبوب‌ترین کتاب‌ها بر اساس امتیاز و مشارکت کاربران پی‌رنگ"
      books={popularBooks}
      icon={Sparkles}
    />
  );
}
