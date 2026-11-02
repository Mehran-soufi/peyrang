
"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const PAGE_PATH = "/admin/contributions";

export async function updateContributionStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!id || !["approved", "rejected"].includes(status)) {
    throw new Error("Invalid contribution ID or status.");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contributions")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to update contribution status: ${error.message}`,
    );
  }

  if (!data) {
    throw new Error(
      "Contribution not found or it has already been processed.",
    );
  }

  revalidatePath(PAGE_PATH);
  revalidatePath("/admin");
}
