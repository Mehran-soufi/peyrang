import { createClient } from "@/lib/supabase/server";
import { getAuthorImagePath } from "@/lib/author-images";

export type AuthorSummary = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatarUrl: string | null;
  nationality: string | null;
  birthYear: number | null;
  deathYear: number | null;
  featuredOrder: number | null;
  featuredBookCount: number | null;
  featuredImage: string | null;
  bookCount: number;
};

export type FeaturedAuthor = {
  slug: string;
  name: string;
  nationality: string;
  birthYear: number;
  deathYear?: number;
  booksCount: number;
  image: string;
};

export type AdaptationSummary = {
  id: string;
  title: string;
  type: string;
  releaseYear: number | null;
  description: string | null;
  posterUrl: string | null;
  director: string | null;
  book: {
    title: string;
    slug: string;
    author: string | null;
  } | null;
};

export async function getAuthors(): Promise<AuthorSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("authors")
    .select(`
      id,
      name,
      slug,
      bio,
      avatar_url,
      nationality,
      birth_year,
      death_year,
      homepage_position,
      homepage_book_count,
      homepage_image,
      book_authors(count)
    `)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch authors: ${error.message}`);
  }

  return (data ?? []).map((author) => ({
    id: author.id,
    name: author.name,
    slug: author.slug,
    bio: author.bio,
    avatarUrl: getAuthorImagePath(author.slug, author.avatar_url),
    nationality: author.nationality,
    birthYear: author.birth_year,
    deathYear: author.death_year,
    featuredOrder: author.homepage_position,
    featuredBookCount: author.homepage_book_count,
    featuredImage: author.homepage_image,
    bookCount: author.book_authors.reduce(
      (total, relation) => total + relation.count,
      0,
    ),
  }));
}

export async function getAuthorBySlug(
  slug: string,
): Promise<AuthorSummary | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("authors")
    .select(`
      id,
      name,
      slug,
      bio,
      avatar_url,
      nationality,
      birth_year,
      death_year,
      homepage_position,
      homepage_book_count,
      homepage_image,
      book_authors(count)
    `)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch author: ${error.message}`);
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    bio: data.bio,
    avatarUrl: getAuthorImagePath(data.slug, data.avatar_url),
    nationality: data.nationality,
    birthYear: data.birth_year,
    deathYear: data.death_year,
    featuredOrder: data.homepage_position,
    featuredBookCount: data.homepage_book_count,
    featuredImage: data.homepage_image,
    bookCount: data.book_authors.reduce(
      (total, relation) => total + relation.count,
      0,
    ),
  };
}

export async function getFeaturedAuthors(): Promise<FeaturedAuthor[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("authors")
    .select(
      "slug, name, nationality, birth_year, death_year, homepage_image, book_authors(count)",
    )
    .not("homepage_position", "is", null)
    .order("homepage_position", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch featured authors: ${error.message}`);
  }

  return (data ?? []).map((author) => ({
    slug: author.slug,
    name: author.name,
    nationality: author.nationality ?? "",
    birthYear: author.birth_year ?? 0,
    deathYear: author.death_year ?? undefined,
    booksCount: author.book_authors.reduce(
      (total, relation) => total + relation.count,
      0,
    ),
    image: author.homepage_image ?? "",
  }));
}

export async function getAdaptations(): Promise<AdaptationSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("adaptations")
    .select("id, title, type, release_year, description, poster_url, director, book_id")
    .order("release_year", { ascending: false, nullsFirst: false })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch adaptations: ${error.message}`);
  }

  const bookIds = [...new Set((data ?? []).map((item) => item.book_id))];
  const booksById = new Map<
    string,
    { title: string; slug: string; author: string | null }
  >();

  if (bookIds.length > 0) {
    const { data: books, error: booksError } = await supabase
      .from("books")
      .select("id, title, slug, book_authors(author:authors(name))")
      .in("id", bookIds);

    if (booksError) {
      throw new Error(`Failed to fetch adaptation books: ${booksError.message}`);
    }

    for (const book of books ?? []) {
      const relation = book.book_authors[0]?.author;
      const author = Array.isArray(relation) ? relation[0] : relation;

      booksById.set(book.id, {
        title: book.title,
        slug: book.slug,
        author: author?.name ?? null,
      });
    }
  }

  return (data ?? []).map((adaptation) => ({
    id: adaptation.id,
    title: adaptation.title,
    type: adaptation.type,
    releaseYear: adaptation.release_year,
    description: adaptation.description,
    posterUrl: adaptation.poster_url,
    director: adaptation.director,
    book: booksById.get(adaptation.book_id) ?? null,
  }));
}
