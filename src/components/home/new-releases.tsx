import { BookOpen } from "lucide-react";

import { BookSection } from "@/components/home/book-section";
import { getBooks } from "@/lib/supabase/queries/books";

export async function NewReleases() {
  const books = await getBooks();

  const newReleases = books.map((book) => ({
    title: book.title,
    author: book.author,
    rating: null,
    cover: book.cover,
  }));

  return (
    <BookSection
      eyebrow="تازه در پی‌رنگ"
      title="تازه‌های کتاب"
      description="کتاب‌هایی که به‌تازگی به مجموعه پی‌رنگ اضافه شده‌اند"
      books={newReleases}
      icon={BookOpen}
    />
  );
}