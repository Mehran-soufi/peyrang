
import { createClient } from "@/lib/supabase/server";

type PublicProfile = {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    created_at: string | null;
    is_public: boolean;
    show_reviews: boolean;
    show_favorites: boolean;
};

export async function getPublicProfileByUsername(
    username: string
): Promise<PublicProfile | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select(`
            id,
            username,
            display_name,
            avatar_url,
            bio,
            created_at,
            is_public,
            show_reviews,
            show_favorites
        `)
        .eq("username", username)
        .eq("is_public", true)
        .maybeSingle();

    if (error) {
        throw new Error(`Failed to fetch public profile: ${error.message}`);
    }

    if (data) {
        return data;
    }

    const {
        data: privateDataRaw,
        error: privateError,
    } = await supabase
        .rpc("get_private_profile_identity", {
            p_username: username,
        });

    const privateData = privateDataRaw as {
        id: string;
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    }[] | null;

    if (privateError) {
        throw new Error(
            `Failed to fetch private profile identity: ${privateError.message}`
        );
    }

    if (!privateData?.length) {
        return null;
    }

    return {
        id: privateData[0].id,
        username: privateData[0].username,
        display_name: privateData[0].display_name,
        avatar_url: privateData[0].avatar_url,
        bio: null,
        created_at: null,
        is_public: false,
        show_reviews: false,
        show_favorites: false,
    };
}

export async function getPublicProfileReviews(userId: string) {
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
            book:books (title, slug, cover_url)
        `)
        .eq("user_id", userId)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(`Failed to fetch public reviews: ${error.message}`);
    }

    return data.map((review) => {
        const book = Array.isArray(review.book)
            ? review.book[0]
            : review.book;

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

export async function getPublicProfileFavorites(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("favorites")
        .select(`
            created_at,
            book:books (id, title, slug, cover_url)
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(`Failed to fetch public favorites: ${error.message}`);
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
