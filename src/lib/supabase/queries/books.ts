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

export type BookDetail = {
  id: string;
  title: string;
  originalTitle: string | null;
  slug: string;
  description: string | null;
  cover: string | null;
  publicationYear: number | null;
  pageCount: number | null;
  language: string | null;
  ratingAverage: number | null;
  ratingCount: number;

  author: {
    id: string;
    name: string;
    slug: string;
    bio: string | null;
    avatarUrl: string | null;
  } | null;

  genres: {
    id: string;
    name: string;
    slug: string;
  }[];

  adaptations: {
    id: string;
    title: string;
    type: string;
    releaseYear: number | null;
    description: string | null;
    posterUrl: string | null;
    director: string | null;
  }[];
};

type NestedEntity = {
  id: string;
  name: string;
  slug: string;
};

type AuthorEntity = NestedEntity & {
  bio: string | null;
  avatar_url: string | null;
};

function getFirstEntity<T>(
  value: T | T[] | null | undefined,
): T | undefined {
  return Array.isArray(value) ? value[0] : value ?? undefined;
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

export async function getBookBySlug(
  slug: string,
): Promise<BookDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("books")
    .select(`
      id,
      title,
      original_title,
      slug,
      description,
      cover_url,
      publication_year,
      page_count,
      language,
      book_authors (
        author:authors (
          id,
          name,
          slug,
          bio,
          avatar_url
        )
      ),
      book_genres (
        genre:genres (
          id,
          name,
          slug
        )
      ),
      adaptations (
  id,
  title,
  type,
  release_year,
  description,
  poster_url,
  director
)
    `)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch book: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const { data: ratings, error: ratingsError } = await supabase
    .from("ratings")
    .select("rating")
    .eq("book_id", data.id);

  if (ratingsError) {
    throw new Error(
      `Failed to fetch book ratings: ${ratingsError.message}`,
    );
  }

  const ratingCount = ratings.length;

  const ratingAverage =
    ratingCount > 0
      ? ratings.reduce((sum, item) => sum + item.rating, 0) /
      ratingCount
      : null;

  const author = getFirstEntity(data.book_authors[0]?.author);

  return {
    id: data.id,
    title: data.title,
    originalTitle: data.original_title,
    slug: data.slug,
    description: data.description,
    cover: data.cover_url,
    publicationYear: data.publication_year,
    pageCount: data.page_count,
    language: data.language,
    ratingAverage,
    ratingCount,
    author: author
      ? {
        id: author.id,
        name: author.name,
        slug: author.slug,
        bio: author.bio,
        avatarUrl: author.avatar_url,
      }
      : null,
    genres: data.book_genres
      .map(({ genre }) => {
        const item = getFirstEntity(genre);

        return item
          ? {
            id: item.id,
            name: item.name,
            slug: item.slug,
          }
          : null;
      })
      .filter(
        (
          genre,
        ): genre is {
          id: string;
          name: string;
          slug: string;
        } => genre !== null,
      ),
    adaptations: data.adaptations.map((adaptation) => ({
      id: adaptation.id,
      title: adaptation.title,
      type: adaptation.type,
      releaseYear: adaptation.release_year,
      description: adaptation.description,
      posterUrl: adaptation.poster_url,
      director: adaptation.director,
    })),
  };
}


export type LibraryStats = {
  books: number;
  authors: number;
  adaptations: number;
};

export async function getLibraryStats(): Promise<LibraryStats> {
  const supabase = await createClient();

  const [booksResult, authorsResult, adaptationsResult] =
    await Promise.all([
      supabase
        .from("books")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("authors")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("adaptations")
        .select("*", { count: "exact", head: true }),
    ]);

  const error =
    booksResult.error ??
    authorsResult.error ??
    adaptationsResult.error;

  if (error) {
    throw new Error(`Failed to fetch library stats: ${error.message}`);
  }

  return {
    books: booksResult.count ?? 0,
    authors: authorsResult.count ?? 0,
    adaptations: adaptationsResult.count ?? 0,
  };
}
