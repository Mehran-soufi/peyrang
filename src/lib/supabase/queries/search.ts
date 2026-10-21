
import { createClient } from "@/lib/supabase/server";

export type SearchBookResult = {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  author: string;
  ratingAverage: number | null;
  ratingCount: number;
};

const bookSelect = `
  id,
  title,
  slug,
  cover_url,
  book_authors (
    author:authors (
      name
    )
  ),
  ratings (
    rating
  )
`;

export async function searchBooks(
  query: string,
  limit = 5,
): Promise<SearchBookResult[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const supabase = await createClient();

  // جست‌وجو در عنوان اصلی کتاب
  const { data: titleMatches, error: titleError } = await supabase
    .from("books")
    .select(bookSelect)
    .ilike("title", `%${trimmedQuery}%`)
    .order("title", { ascending: true })
    .limit(limit);

  if (titleError) {
    throw new Error(
      `Failed to search books by title: ${titleError.message}`,
    );
  }

  // جست‌وجو در عنوان‌های جایگزین
  const { data: alternativeTitles, error: alternativeError } =
    await supabase
      .from("book_alternative_titles")
      .select("book_id")
      .ilike("title", `%${trimmedQuery}%`)
      .limit(limit * 5);

  if (alternativeError) {
    throw new Error(
      `Failed to search alternative titles: ${alternativeError.message}`,
    );
  }

  // حذف شناسه‌های تکراری
  const alternativeBookIds = [
    ...new Set(alternativeTitles.map((item) => item.book_id)),
  ];

  // دریافت اطلاعات کامل کتاب‌هایی که با عنوان جایگزین پیدا شده‌اند
  let alternativeBooks: typeof titleMatches = [];

  if (alternativeBookIds.length > 0) {
    const { data, error } = await supabase
      .from("books")
      .select(bookSelect)
      .in("id", alternativeBookIds);

    if (error) {
      throw new Error(
        `Failed to fetch books by alternative titles: ${error.message}`,
      );
    }

    alternativeBooks = data;
  }

  // ترکیب نتایج و حذف کتاب‌های تکراری
  const uniqueBooks = Array.from(
    new Map(
      [...titleMatches, ...alternativeBooks].map((book) => [
        book.id,
        book,
      ]),
    ).values(),
  )
    .sort((a, b) => a.title.localeCompare(b.title, "fa"))
    .slice(0, limit);

  return uniqueBooks.map((book) => {
    const relation = book.book_authors[0]?.author;
    const author = Array.isArray(relation) ? relation[0] : relation;

    const ratingCount = book.ratings.length;

    const ratingAverage =
      ratingCount > 0
        ? book.ratings.reduce((sum, item) => sum + item.rating, 0) /
          ratingCount
        : null;

    return {
      id: book.id,
      title: book.title,
      slug: book.slug,
      cover: book.cover_url,
      author: author?.name ?? "نویسنده نامشخص",
      ratingAverage,
      ratingCount,
    };
  });
}
