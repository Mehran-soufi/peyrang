import { CommunityCta } from "@/components/home/community-cta";
import { Hero } from "@/components/home/hero";
import { NewReleases } from "@/components/home/new-releases";
import { PopularBooks } from "@/components/home/popular-books";
import DailyQuote from "@/components/home/daily-quote";
import { Authors } from "@/components/home/authors";
import { Adaptations } from "@/components/home/adaptations";
import { getLibraryStats } from "@/lib/supabase/queries/books";

export default async function Home() {
  const stats = await getLibraryStats();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <Hero stats={stats} />
      <DailyQuote />
      <PopularBooks />
      <CommunityCta />
      <Authors />
      <NewReleases />
      <Adaptations />
    </main>
  );
}
