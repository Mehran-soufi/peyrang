
import { NextRequest, NextResponse } from "next/server";

import { searchBooks } from "@/lib/supabase/queries/search";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query || query.length > 100) {
    return NextResponse.json({ books: [] });
  }

  try {
    const books = await searchBooks(query, 5);

    return NextResponse.json({ books });
  } catch (error) {
    console.error("Book search failed:", error);

    return NextResponse.json(
      { error: "جست‌وجوی کتاب با خطا مواجه شد." },
      { status: 500 },
    );
  }
}
