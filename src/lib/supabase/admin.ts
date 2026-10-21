
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect("/login");
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

        console.log("Admin check:", {
  userId: user.id,
  profile,
  profileError,
});

    if (profileError || profile?.role !== "admin") {
        redirect("/");
    }

    return { user, profile };
}
