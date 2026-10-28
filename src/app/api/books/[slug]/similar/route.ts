import { NextResponse } from "next/server";

import { getSimilarBooks } from "@/lib/supabase/queries/books";

type SimilarBooksRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: SimilarBooksRouteProps) {
  const { slug } = await params;

  try {
    const books = await getSimilarBooks(slug);
    return NextResponse.json({ books });
  } catch (error) {
    console.error("Failed to load similar books:", error);
    return NextResponse.json(
      { error: "دریافت کتاب‌های مشابه با خطا روبه‌رو شد." },
      { status: 500 },
    );
  }
}
