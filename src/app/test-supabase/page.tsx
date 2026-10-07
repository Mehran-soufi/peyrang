import { createClient } from "@/lib/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  const { data: books, error } = await supabase
  .from("books")
  .select(`
    id,
    title,
    slug,
    publication_year,
    language,
    book_authors (
      author:authors (
        id,
        name,
        slug
      )
    ),
    book_genres (
      genre:genres (
        id,
        name,
        slug
      )
    )
  `)
  .order("title");

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
          <h1 className="text-lg font-bold text-destructive">
            خطا در دریافت کتاب‌ها
          </h1>

          <pre className="mt-4 overflow-x-auto text-sm text-muted-foreground">
            {error.message}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-black">تست Supabase</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          کتاب‌ها و نویسندگان دریافت‌شده از دیتابیس:
        </p>

        <div className="mt-6 space-y-4">
          {books?.map((book) => (
            <article
              key={book.id}
              className="rounded-2xl border border-border/60 bg-card p-5"
            >
              <h2 className="font-bold">{book.title}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {book.publication_year} · {book.language}
              </p>

              <div className="mt-4">
                <p className="text-sm font-semibold">نویسنده:</p>

                <div className="mt-2 space-y-1">
                  {book.book_authors.map(({ author }) => (
                    <p
                      key={author.id}
                      className="text-sm text-muted-foreground"
                    >
                      {author.name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4">
  <p className="text-sm font-semibold">ژانر:</p>

  <div className="mt-2 space-y-1">
    {book.book_genres.map(({ genre }) => (
      <p
        key={genre.id}
        className="text-sm text-muted-foreground"
      >
        {genre.name}
      </p>
    ))}
  </div>
</div>

              <p className="mt-4 text-xs text-muted-foreground">
                slug: {book.slug}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}