import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { getAuthorImagePath } from "@/lib/author-images";

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
    nationality: string | null;
    birthYear: number | null;
    deathYear: number | null;
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

export type SimilarBook = BookListItem;

type NestedEntity = {
  id: string;
  name: string;
  slug: string;
};

type AuthorEntity = NestedEntity & {
  bio: string | null;
  avatar_url: string | null;
  nationality: string | null;
  birth_year: number | null;
  death_year: number | null;
  homepage_image: string | null;
};

function getFirstEntity<T>(
  value: T | T[] | null | undefined,
): T | undefined {
  return Array.isArray(value) ? value[0] : value ?? undefined;
}


async function fetchBooks(): Promise<BookListItem[]> {
  const supabase = createPublicClient();

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

export const getBooks = unstable_cache(fetchBooks, ["public-books"], {
  revalidate: 60,
});

async function fetchSimilarBooks(
  slug: string,
  limit = 8,
): Promise<SimilarBook[]> {
  const supabase = createPublicClient();
  const { data: currentBook, error: currentBookError } = await supabase
    .from("books")
    .select(`
      id,
      book_authors(author_id, author:authors(id, name)),
      book_genres(genre_id, genre:genres(id, name))
    `)
    .eq("slug", slug)
    .maybeSingle();

  if (currentBookError) {
    throw new Error(`Failed to fetch the current book: ${currentBookError.message}`);
  }

  if (!currentBook) return [];

  const genreIds = currentBook.book_genres.map((relation) => relation.genre_id);
  const authorIds = currentBook.book_authors.map((relation) => relation.author_id);
  const currentAuthorNames = new Set(
    currentBook.book_authors
      .map((relation) => getFirstEntity(relation.author)?.name)
      .filter((name): name is string => Boolean(name)),
  );

  const candidateIdSet = new Set<string>();
  const candidateLookups = await Promise.all([
    genreIds.length
      ? supabase
          .from("book_genres")
          .select("book_id")
          .in("genre_id", genreIds)
          .neq("book_id", currentBook.id)
          .limit(250)
      : Promise.resolve({ data: [], error: null }),
    authorIds.length
      ? supabase
          .from("book_authors")
          .select("book_id")
          .in("author_id", authorIds)
          .neq("book_id", currentBook.id)
          .limit(250)
      : Promise.resolve({ data: [], error: null }),
  ]);

  const lookupError = candidateLookups.find((result) => result.error)?.error;
  if (lookupError) {
    throw new Error(`Failed to find similar book candidates: ${lookupError.message}`);
  }

  for (const result of candidateLookups) {
    for (const relation of result.data ?? []) {
      candidateIdSet.add(relation.book_id);
    }
  }

  if (candidateIdSet.size === 0) return [];

  const { data: candidates, error: candidatesError } = await supabase
    .from("books")
    .select(`
      id,
      title,
      slug,
      cover_url,
      publication_year,
      language,
      book_authors(author:authors(id, name)),
      book_genres(genre_id, genre:genres(id, name)),
      ratings(rating)
    `)
    .in("id", [...candidateIdSet])
    .limit(250);

  if (candidatesError) {
    throw new Error(`Failed to fetch similar books: ${candidatesError.message}`);
  }

  const currentGenreIds = new Set(genreIds);
  const ranked = (candidates ?? [])
    .map((candidate) => {
      const sharedGenres = candidate.book_genres
        .filter((relation) => currentGenreIds.has(relation.genre_id))
        .map((relation) => getFirstEntity(relation.genre)?.name)
        .filter((name): name is string => Boolean(name));
      const candidateAuthorNames = candidate.book_authors
        .map((relation) => getFirstEntity(relation.author)?.name)
        .filter((name): name is string => Boolean(name));
      const sharesAuthor = candidateAuthorNames.some((name) =>
        currentAuthorNames.has(name),
      );

      const similarityScore = sharedGenres.length * 3 + (sharesAuthor ? 1.5 : 0);
      const ratingCount = candidate.ratings.length;
      const ratingAverage = ratingCount
        ? candidate.ratings.reduce((sum, item) => sum + item.rating, 0) / ratingCount
        : null;
      const confidenceWeightedRating = ratingAverage === null
        ? 0
        : ratingAverage * (ratingCount / (ratingCount + 5));
      return {
        book: {
          id: candidate.id,
          title: candidate.title,
          slug: candidate.slug,
          cover: candidate.cover_url,
          author: candidateAuthorNames[0] ?? "نویسنده نامشخص",
          publicationYear: candidate.publication_year,
          language: candidate.language,
          genres: candidate.book_genres
            .map((relation) => getFirstEntity(relation.genre)?.name)
            .filter((name): name is string => Boolean(name)),
          ratingAverage,
          ratingCount,
        },
        similarityScore,
        confidenceWeightedRating,
      };
    })
    .filter((item) => item.similarityScore > 0)
    .sort(
      (a, b) =>
        b.similarityScore - a.similarityScore ||
        b.confidenceWeightedRating - a.confidenceWeightedRating ||
        b.book.ratingCount - a.book.ratingCount ||
        a.book.title.localeCompare(b.book.title, "fa"),
    );

  return ranked.slice(0, Math.max(1, limit)).map(({ book }) => book);
}

export const getSimilarBooks = unstable_cache(
  fetchSimilarBooks,
  ["public-similar-books"],
  { revalidate: 60 },
);


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

async function fetchPaginatedBooks(
  params: PaginatedBooksParams = {},
): Promise<PaginatedBooksResult> {
  const supabase = createPublicClient();

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

export const getPaginatedBooks = unstable_cache(
  fetchPaginatedBooks,
  ["public-paginated-books"],
  { revalidate: 60 },
);


async function fetchBookBySlug(
  slug: string,
): Promise<BookDetail | null> {
  const supabase = createPublicClient();

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
          avatar_url,
          nationality,
          birth_year,
          death_year,
          homepage_image
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
      ),
      ratings(rating)
    `)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch book: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const ratingCount = data.ratings.length;

  const ratingAverage =
    ratingCount > 0
      ? data.ratings.reduce((sum, item) => sum + item.rating, 0) /
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
        avatarUrl:
          author.homepage_image ??
          getAuthorImagePath(author.slug, author.avatar_url),
        nationality: author.nationality,
        birthYear: author.birth_year,
        deathYear: author.death_year,
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

export const getBookBySlug = unstable_cache(
  fetchBookBySlug,
  ["public-book-detail"],
  { revalidate: 60 },
);


export type LibraryStats = {
  books: number;
  authors: number;
  adaptations: number;
};

async function fetchLibraryStats(): Promise<LibraryStats> {
  const supabase = createPublicClient();

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

export const getLibraryStats = unstable_cache(
  fetchLibraryStats,
  ["public-library-stats"],
  { revalidate: 60 },
);

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

async function fetchBookFilterOptions(): Promise<BookFilterOptions> {
  const supabase = createPublicClient();

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

export const getBookFilterOptions = unstable_cache(
  fetchBookFilterOptions,
  ["public-book-filter-options"],
  { revalidate: 60 },
);
