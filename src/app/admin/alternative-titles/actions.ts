
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function createAlternativeTitle(formData: FormData) {
    await requireAdmin();

    const title = String(formData.get("title") ?? "").trim();
    const bookId = String(formData.get("bookId") ?? "").trim();

    if (!title || !bookId) {
        redirect("/admin/alternative-titles?error=missing-fields");
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("book_alternative_titles")
        .insert({
            title,
            book_id: bookId,
        });

    if (error) {
        if (error.code === "23505") {
            redirect("/admin/alternative-titles?error=duplicate");
        }

        throw new Error(
            `Failed to create alternative title: ${error.message}`,
        );
    }

    revalidatePath("/admin/alternative-titles");
    revalidatePath("/");

    redirect("/admin/alternative-titles?success=created");
}
