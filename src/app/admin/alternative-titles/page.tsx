import Link from "next/link";

import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { createAlternativeTitle } from "./actions";
import { BookSelector } from "./book-selector";
import { SubmitButton } from "./submit-button";

export default async function AlternativeTitlesPage() {
  await requireAdmin();

  const supabase = await createClient();

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("id, title, slug")
    .order("title", { ascending: true });

  if (booksError) {
    throw new Error(`Failed to fetch books: ${booksError.message}`);
  }

  const { data: titles, error } = await supabase
    .from("book_alternative_titles")
    .select(
      `
      id,
      title,
      created_at,
      book:books (
        id,
        title,
        slug
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch alternative titles: ${error.message}`);
  }

  return (
    <main className="min-h-screen bg-background p-6 sm:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <Link
            href="/admin"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← بازگشت به داشبورد
          </Link>

          <h1 className="text-2xl font-black sm:text-3xl">
            مدیریت عنوان‌های جایگزین
          </h1>

          <p className="text-sm text-muted-foreground">
            عنوان‌های دیگری را که کاربران ممکن است برای جست‌وجوی کتاب‌ها استفاده
            کنند، مدیریت کن.
          </p>
        </header>

        <section className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            تعداد عنوان‌های ثبت‌شده
          </p>
          <p className="mt-2 text-3xl font-black">{titles.length}</p>
        </section>

        <section className="rounded-2xl border bg-card p-5">
          <h2 className="text-lg font-bold">افزودن عنوان جایگزین</h2>

          <form action={createAlternativeTitle} className="mt-4 space-y-4">
            <div className="space-y-2">
              <BookSelector books={books} />
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                عنوان جایگزین
              </label>
              <input
                id="title"
                name="title"
                required
                maxLength={300}
                placeholder="مثلاً قلعه حیوانات"
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>

            <SubmitButton />
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold">عنوان‌های ثبت‌شده</h2>

          {titles.length === 0 ? (
            <div className="rounded-2xl border p-8 text-center text-sm text-muted-foreground">
              هنوز عنوان جایگزینی ثبت نشده است.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border">
              <table className="w-full text-right text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-4 font-semibold">عنوان جایگزین</th>
                    <th className="p-4 font-semibold">کتاب اصلی</th>
                    <th className="p-4 font-semibold">پیوند کتاب</th>
                  </tr>
                </thead>

                <tbody>
                  {titles.map((item) => {
                    const book = Array.isArray(item.book)
                      ? item.book[0]
                      : item.book;

                    return (
                      <tr key={item.id} className="border-t">
                        <td className="p-4 font-medium">{item.title}</td>
                        <td className="p-4">{book?.title ?? "کتاب نامشخص"}</td>
                        <td className="p-4">
                          {book ? (
                            <Link
                              href={`/books/${book.slug}`}
                              className="text-orange-600 hover:underline"
                            >
                              مشاهده کتاب
                            </Link>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
