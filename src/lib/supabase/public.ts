import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Stateless client for catalog data that is public to every visitor.
 * Keeping cookies and user sessions out of this client makes its query results
 * safe to cache across requests.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    },
  );
}
