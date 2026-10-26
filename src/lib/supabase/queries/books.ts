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
  ratingAverage: number | null;
  ratingCount: number;
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
    ),
    ratings (
      rating
    )
  `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch books: ${error.message}`);
  }

  return data.map((book) => {
    const author = getFirstEntity(book.book_authors[0]?.author);
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
      publicationYear: book.publication_year,
      language: book.language,
      genres: book.book_genres
        .map(({ genre }) => {
          const item = getFirstEntity(genre);
          return item?.name;
        })
        .filter((name): name is string => Boolean(name)),
      ratingAverage,
      ratingCount,
    };
  });
}


export type PaginatedBooksParams = {
  query?: string;
  sortBy?: "newest" | "highest_rating" | "most_rated" | "alphabetical";
  genreSlug?: string;
  authorSlug?: string;
  language?: string;
  yearFrom?: number;
  yearTo?: number;
  page?: number;
  pageSize?: 12 | 24 | 48;
};

export type PaginatedBooksResult = {
  books: BookListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export async function getPaginatedBooks(
  params: PaginatedBooksParams = {},
): Promise<PaginatedBooksResult> {
  const supabase = await createClient();

  const page = Math.max(1, Math.floor(params.page ?? 1));
  const pageSize = params.pageSize ?? 12;

  const { data, error } = await supabase.rpc("get_paginated_books", {
    p_query: params.query?.trim() || null,
    p_sort_by: params.sortBy ?? "newest",
    p_genre_slug: params.genreSlug || null,
    p_author_slug: params.authorSlug || null,
    p_language: params.language || null,
    p_year_from: params.yearFrom ?? null,
    p_year_to: params.yearTo ?? null,
    p_page: page,
    p_page_size: pageSize,
  });

  if (error) {
    throw new Error(`Failed to fetch paginated books: ${error.message}`);
  }

const books: BookListItem[] = (data ?? []).map(
  (book: {
    id: string;
    title: string;
    slug: string;
    cover: string | null;
    author: string;
    publication_year: number | null;
    language: string | null;
    genres: string[] | null;
    rating_average: number | null;
    rating_count: number;
    total_count: number;
  }) => ({
    id: book.id,
    title: book.title,
    slug: book.slug,
    cover: book.cover,
    author: book.author,
    publicationYear: book.publication_year,
    language: book.language,
    genres: book.genres ?? [],
    ratingAverage: book.rating_average,
    ratingCount: Number(book.rating_count),
  }),
);

  return {
    books,
    totalCount: data?.length ? Number(data[0].total_count) : 0,
    page,
    pageSize,
  };
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

export async function getPopularBooks(): Promise<BookListItem[]> {
  const books = await getBooks();

  const ratedBooks = books.filter(
    (book) => book.ratingCount > 0 && book.ratingAverage !== null,
  );

  if (ratedBooks.length === 0) return [];

  const totalVotes = ratedBooks.reduce(
    (sum, book) => sum + book.ratingCount,
    0,
  );

  const globalAverage = ratedBooks.reduce(
    (sum, book) => sum + book.ratingAverage! * book.ratingCount,
    0,
  ) / totalVotes;

  const minimumVotes = 5;

  return ratedBooks
    .map((book) => ({
      book,
      score:
        (book.ratingCount / (book.ratingCount + minimumVotes)) *
        book.ratingAverage! +
        (minimumVotes / (book.ratingCount + minimumVotes)) * globalAverage,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ book }) => book);
}

export type BookFilterOptions = {
  genres: { id: string; name: string; slug: string }[];
  authors: { id: string; name: string; slug: string }[];
  languages: string[];
  minYear: number | null;
  maxYear: number | null;
};

export async function getBookFilterOptions(): Promise<BookFilterOptions> {
  const supabase = await createClient();

  const [genresResult, authorsResult, booksResult] = await Promise.all([
    supabase.from("genres").select("id, name, slug").order("name"),
    supabase.from("authors").select("id, name, slug").order("name"),
    supabase.from("books").select("language, publication_year"),
  ]);

  if (genresResult.error) {
    throw new Error(`Failed to fetch genres: ${genresResult.error.message}`);
  }

  if (authorsResult.error) {
    throw new Error(`Failed to fetch authors: ${authorsResult.error.message}`);
  }

  if (booksResult.error) {
    throw new Error(`Failed to fetch book filter options: ${booksResult.error.message}`);
  }

  const years = (booksResult.data ?? [])
    .map((book) => book.publication_year)
    .filter((year): year is number => year !== null);

  const languages = [
    ...new Set(
      (booksResult.data ?? [])
        .map((book) => book.language?.trim())
        .filter((language): language is string => Boolean(language)),
    ),
  ].sort((a, b) => a.localeCompare(b, "fa"));

  return {
    genres: genresResult.data ?? [],
    authors: authorsResult.data ?? [],
    languages,
    minYear: years.length ? Math.min(...years) : null,
    maxYear: years.length ? Math.max(...years) : null,
  };
}