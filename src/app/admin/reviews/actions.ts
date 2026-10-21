
"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const PAGE_PATH = "/admin/reviews";

export async function updateReviewStatus(
  formData: FormData,
) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!id || !["approved", "rejected"].includes(status)) {
    throw new Error("Invalid review ID or status.");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .update({ status })
    .eq("id", id)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to update review status: ${error.message}`,
    );
  }

  if (!data) {
    throw new Error(
      "Review not found or it has already been processed.",
    );
  }

  revalidatePath(PAGE_PATH);
  revalidatePath("/");
}
