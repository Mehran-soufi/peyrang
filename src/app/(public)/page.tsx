import { CommunityCta } from "@/components/home/community-cta";
import { Hero } from "@/components/home/hero";
import { NewReleases } from "@/components/home/new-releases";
import { PopularBooks } from "@/components/home/popular-books";
import DailyQuote from "@/components/home/daily-quote";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center w-full">
      <Hero />
      <DailyQuote/>
      <PopularBooks />
      <CommunityCta/>
      <NewReleases/>
    </main>
  );
}
