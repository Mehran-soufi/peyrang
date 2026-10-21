"use client";

import { useId, useState } from "react";

type Book = {
  id: string;
  title: string;
  slug: string;
};

type BookSelectorProps = {
  books: Book[];
  initialBook?: Book | null;
};

export function BookSelector({ books, initialBook = null }: BookSelectorProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(initialBook);

  const filteredBooks = books
    .filter((book) =>
      book.title
        .toLocaleLowerCase("fa")
        .includes(query.trim().toLocaleLowerCase("fa")),
    )
    .slice(0, 10);

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-medium">
        کتاب اصلی
      </label>

      <input
        id={inputId}
        type="text"
        value={selectedBook ? selectedBook.title : query}
        onChange={(event) => {
          setQuery(event.target.value);
          setSelectedBook(null);
        }}
        placeholder="نام کتاب را جست‌وجو کن..."
        autoComplete="off"
        required={!selectedBook}
        className="w-full rounded-lg border bg-background px-3 py-2"
      />

      {selectedBook && (
        <input type="hidden" name="bookId" value={selectedBook.id} />
      )}

      {!selectedBook && query.trim() && (
        <div className="max-h-60 overflow-y-auto rounded-lg border bg-background">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => {
                  setSelectedBook(book);
                  setQuery("");
                }}
                className="block w-full px-3 py-2 text-right text-sm hover:bg-muted"
              >
                {book.title}
              </button>
            ))
          ) : (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              کتابی با این عنوان پیدا نشد.
            </p>
          )}
        </div>
      )}

      {selectedBook && (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3 text-sm">
          <span>
            کتاب انتخاب‌شده: <strong>{selectedBook.title}</strong>
          </span>

          <button
            type="button"
            onClick={() => {
              setSelectedBook(null);
              setQuery("");
            }}
            className="shrink-0 text-orange-600 hover:underline"
          >
            تغییر
          </button>
        </div>
      )}
    </div>
  );
}
