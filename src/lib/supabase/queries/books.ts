import { createClient } from "@/lib/supabase/server";

export type BookListItem = {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  author: string;
  publicationYear: number | null;
  language: string | null;
  genres: string[];
};

type NestedEntity = {
  id: string;
  name: string;
  slug: string;
};

function getFirstEntity(
  value: NestedEntity | NestedEntity[] | null | undefined,
) {
  return Array.isArray(value) ? value[0] : value;
}

export async function getBooks(): Promise<BookListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("books")
    .select(`
    id,
    title,
    slug,
    cover_url,
    publication_year,
    language,
    book_authors (
      author:authors (
        id,
        name,
        slug
      )
    ),
    book_genres (
      genre:genres (
        id,
        name,
        slug
      )
    )
  `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch books: ${error.message}`);
  }

  return data.map((book) => {
    const author = getFirstEntity(book.book_authors[0]?.author);

    return {
      id: book.id,
      title: book.title,
      slug: book.slug,
      cover: book.cover_url,
      author: author?.name ?? "نویسنده نامشخص",
      publicationYear: book.publication_year,
      language: book.language,
      genres: book.book_genres
        .map(({ genre }) => {
          const item = getFirstEntity(genre);

          return item?.name;
        })
        .filter((name): name is string => Boolean(name)),
    };
  });
}