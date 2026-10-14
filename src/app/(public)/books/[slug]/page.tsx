import { notFound } from "next/navigation";

import { BookDetail } from "@/components/books/book-detail";
import { getBookBySlug } from "@/lib/supabase/queries/books";

type BookPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <main className="md:mt-16 mt-13">
      <BookDetail book={book} />
    </main>
  );
}