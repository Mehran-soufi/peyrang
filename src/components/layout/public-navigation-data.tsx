import { PublicNavigation } from "@/components/layout/public-navigation";
import { createClient } from "@/lib/supabase/server";

export async function PublicNavigationData() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  const userId = typeof claims?.sub === "string" ? claims.sub : null;
  const email = typeof claims?.email === "string" ? claims.email : null;

  if (!userId) {
    return <PublicNavigation isAuthenticated={false} account={null} />;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, username, role")
    .eq("id", userId)
    .maybeSingle();

  const account = {
    displayName:
      profile?.display_name ||
      profile?.username ||
      email?.split("@")[0] ||
      "حساب کاربری",
    username: profile?.username ?? null,
    role: profile?.role ?? null,
  };

  return <PublicNavigation isAuthenticated account={account} />;
}
