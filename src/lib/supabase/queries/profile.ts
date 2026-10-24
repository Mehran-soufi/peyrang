
import { createClient } from "@/lib/supabase/server";

export type ProfileReview = {
    id: string;
    content: string;
    status: string;
    editStatus: string | null;
    createdAt: string;
    updatedAt: string;
    book: {
        title: string;
        slug: string;
        cover: string | null;
    } | null;
};

export type ProfileFavorite = {
    createdAt: string;
    book: {
        id: string;
        title: string;
        slug: string;
        cover: string | null;
    } | null;
};

export async function getMyReviews(userId: string): Promise<ProfileReview[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("reviews")
        .select(`
      id,
      content,
      status,
      edit_status,
      created_at,
      updated_at,
      book:books (
        title,
        slug,
        cover_url
      )
    `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(`Failed to fetch user reviews: ${error.message}`);
    }

    return data.map((review) => {
        const book = Array.isArray(review.book) ? review.book[0] : review.book;

        return {
            id: review.id,
            content: review.content,
            status: review.status,
            editStatus: review.edit_status,
            createdAt: review.created_at,
            updatedAt: review.updated_at,
            book: book
                ? {
                    title: book.title,
                    slug: book.slug,
                    cover: book.cover_url,
                }
                : null,
        };
    });
}

export async function getMyFavorites(
    userId: string,
): Promise<ProfileFavorite[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("favorites")
        .select(`
      created_at,
      book:books (
        id,
        title,
        slug,
        cover_url
      )
    `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(`Failed to fetch user favorites: ${error.message}`);
    }

    return data.map((favorite) => {
        const book = Array.isArray(favorite.book)
            ? favorite.book[0]
            : favorite.book;

        return {
            createdAt: favorite.created_at,
            book: book
                ? {
                    id: book.id,
                    title: book.title,
                    slug: book.slug,
                    cover: book.cover_url,
                }
                : null,
        };
    });
}
