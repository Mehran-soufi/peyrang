import { createClient } from "@/lib/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold">Supabase Test</h1>
        <p className="mt-4 text-red-500">
          خطا در دریافت کاربر: {userError.message}
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold">Supabase Test</h1>
        <p className="mt-4">کاربری وارد نشده است.</p>
      </main>
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, display_name, role")
    .eq("id", user.id)
    .single();

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Supabase Test</h1>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>User ID:</strong> {user.id}
        </p>

        {profileError ? (
          <p className="text-red-500">
            خطا در دریافت پروفایل: {profileError.message}
          </p>
        ) : (
          <>
            <p>
              <strong>Display Name:</strong>{" "}
              {profile?.display_name ?? "—"}
            </p>

            <p>
              <strong>Username:</strong> {profile?.username ?? "—"}
            </p>

            <p>
              <strong>Role:</strong> {profile?.role ?? "—"}
            </p>
          </>
        )}
      </div>
    </main>
  );
}