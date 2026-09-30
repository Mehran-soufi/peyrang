import Link from "next/link";

import { signOut } from "@/features/auth/actions/sign-out";
import { createClient } from "@/lib/supabase/server";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const isAuthenticated = Boolean(data?.claims);
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : null;

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold" aria-label="پی‌رنگ">
          پی‌رنگ
        </Link>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {email && (
                <span className="hidden text-sm text-muted-foreground sm:block">
                  {email}
                </span>
              )}

              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  خروج
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                ورود
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                ثبت‌نام
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
