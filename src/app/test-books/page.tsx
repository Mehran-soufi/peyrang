import { getBooks } from "@/lib/supabase/queries/books";

export default async function TestBooksPage() {
  const books = await getBooks();

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-black">تست Query کتاب‌ها</h1>

        <div className="mt-6 space-y-4">
          {books.map((book) => (
            <article
              key={book.id}
              className="rounded-2xl border border-border/60 bg-card p-5"
            >
              <h2 className="font-bold">{book.title}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {book.publicationYear} · {book.language ?? "—"}
              </p>

              <div className="mt-4">
                <p className="text-sm font-semibold">نویسنده:</p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {book.author}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold">ژانر:</p>

                <div className="mt-2 space-y-1">
                  {book.genres.map((genre) => (
                    <p
                      key={genre}
                      className="text-sm text-muted-foreground"
                    >
                      {genre}
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