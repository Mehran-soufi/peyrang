import { requireAdmin } from "@/lib/supabase/admin";

export default async function AdminDashboardPage() {
  const { user } = await requireAdmin();

  return (
    <main className="min-h-screen bg-background p-6 sm:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold text-orange-500">
            PEYRANG / ADMIN
          </p>

          <h1 className="text-2xl font-black sm:text-3xl">
            داشبورد مدیریت پی‌رنگ
          </h1>

          <p className="text-sm text-muted-foreground">
            خوش آمدی؛ از این بخش می‌توانی محتوای پی‌رنگ را مدیریت کنی.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-bold">مدیریت کتاب‌ها</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              افزودن و ویرایش اطلاعات کتاب‌ها
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-bold">مدیریت نویسندگان</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              مدیریت اطلاعات نویسندگان
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-bold">عنوان‌های جایگزین</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              مدیریت عنوان‌های جایگزین برای جست‌وجوی بهتر
            </p>
          </div>
        </section>

        <footer className="border-t pt-4 text-xs text-muted-foreground">
          حساب واردشده: {user.email}
        </footer>
      </div>
    </main>
  );
}
