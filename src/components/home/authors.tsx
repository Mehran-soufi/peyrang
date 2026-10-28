import { LibraryBig } from "lucide-react";

import { AuthorSection } from "@/components/home/author-section";
import { getFeaturedAuthors } from "@/lib/supabase/queries/catalog";

export async function Authors() {
  const authors = await getFeaturedAuthors();

  return (
    <AuthorSection
      eyebrow="چهره‌های ماندگار"
      title="نویسندگان"
      description="با نویسندگانی که داستان‌های ماندگار خلق کرده‌اند آشنا شوید"
      authors={authors}
      icon={LibraryBig}
    />
  );
}
