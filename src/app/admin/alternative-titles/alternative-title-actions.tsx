"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { deleteAlternativeTitle, updateAlternativeTitle } from "./actions";
import { BookSelector } from "./book-selector";

type Book = {
  id: string;
  title: string;
  slug: string;
};

type AlternativeTitleActionsProps = {
  id: string;
  title: string;
  bookId: string;
  books: Book[];
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "در حال حذف..." : "حذف"}
    </button>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "در حال ذخیره..." : "ذخیره تغییرات"}
    </button>
  );
}

export function AlternativeTitleActions({
  id,
  title,
  bookId,
  books,
}: AlternativeTitleActionsProps) {
  const [editing, setEditing] = useState(false);

  const currentBook = books.find((book) => book.id === bookId);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setEditing((value) => !value)}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
      >
        {editing ? "بستن" : "ویرایش"}
      </button>

      <form
        action={deleteAlternativeTitle}
        onSubmit={(event) => {
          if (!window.confirm(`عنوان «${title}» حذف شود؟`)) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <DeleteButton />
      </form>

      {editing && (
        <form
          action={updateAlternativeTitle}
          className="mt-3 basis-full space-y-3 rounded-xl border bg-muted/20 p-4"
        >
          <input type="hidden" name="id" value={id} />

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor={`title-${id}`}>
              عنوان جایگزین
            </label>
            <input
              id={`title-${id}`}
              name="title"
              defaultValue={title}
              required
              maxLength={300}
              className="w-full rounded-lg border bg-background px-3 py-2"
            />
          </div>

          <BookSelector books={books} initialBook={currentBook ?? null} />

          <div className="flex items-center gap-2">
            <UpdateButton />
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
            >
              انصراف
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
