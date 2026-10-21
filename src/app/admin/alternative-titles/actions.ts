
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const PAGE_PATH = "/admin/alternative-titles";

export async function createAlternativeTitle(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const bookId = String(formData.get("bookId") ?? "").trim();

  if (!title || !bookId) {
    redirect(`${PAGE_PATH}?error=missing-fields`);
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
      redirect(`${PAGE_PATH}?error=duplicate`);
    }

    throw new Error(
      `Failed to create alternative title: ${error.message}`,
    );
  }

  revalidatePath(PAGE_PATH);
  revalidatePath("/");

  redirect(`${PAGE_PATH}?success=created`);
}

export async function updateAlternativeTitle(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const bookId = String(formData.get("bookId") ?? "").trim();

  if (!id || !title || !bookId) {
    redirect(`${PAGE_PATH}?error=missing-fields`);
  }

  if (title.length > 300) {
    redirect(`${PAGE_PATH}?error=invalid-title`);
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("book_alternative_titles")
    .update({
      title,
      book_id: bookId,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      redirect(`${PAGE_PATH}?error=duplicate`);
    }

    throw new Error(
      `Failed to update alternative title: ${error.message}`,
    );
  }

  revalidatePath(PAGE_PATH);
  revalidatePath("/");

  redirect(`${PAGE_PATH}?success=updated`);
}

export async function deleteAlternativeTitle(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    redirect(`${PAGE_PATH}?error=missing-fields`);
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("book_alternative_titles")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete alternative title: ${error.message}`,
    );
  }

  revalidatePath(PAGE_PATH);
  revalidatePath("/");

  redirect(`${PAGE_PATH}?success=deleted`);
}
