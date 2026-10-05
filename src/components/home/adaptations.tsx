import { Clapperboard } from "lucide-react";

import { AdaptationSection } from "@/components/home/adaptation-section";

const adaptations = [
  {
    title: "Dune",
    year: 2021,
    rating: 8.0,
    duration: "155 دقیقه",
    bookTitle: "تل‌ماسه",
    author: "فرانک هربرت",
    poster: "/assets/images/adaptations/dune.webp",
  },
  {
    title: "The Lord of the Rings",
    year: 2001,
    rating: 8.9,
    duration: "178 دقیقه",
    bookTitle: "ارباب حلقه‌ها",
    author: "جی. آر. آر. تالکین",
    poster: "/assets/images/adaptations/lord-of-the-rings.webp",
  },
  {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    duration: "175 دقیقه",
    bookTitle: "پدرخوانده",
    author: "ماریو پوزو",
    poster: "/assets/images/adaptations/the-godfather.webp",
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    duration: "142 دقیقه",
    bookTitle: "ریتا هیورث و رستگاری در شاوشنک",
    author: "استیون کینگ",
    poster: "/assets/images/adaptations/shawshank.webp",
  },
  {
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    duration: "139 دقیقه",
    bookTitle: "باشگاه مشت‌زنی",
    author: "چاک پالانیک",
    poster: "/assets/images/adaptations/fight-club.webp",
  },
  {
    title: "The Green Mile",
    year: 1999,
    rating: 8.6,
    duration: "189 دقیقه",
    bookTitle: "مسیر سبز",
    author: "استیون کینگ",
    poster: "/assets/images/adaptations/green-mile.webp",
  },
  {
    title: "Little Women",
    year: 2019,
    rating: 7.8,
    duration: "135 دقیقه",
    bookTitle: "زنان کوچک",
    author: "لوئیزا می آلکوت",
    poster: "/assets/images/adaptations/little-women.webp",
  },
  {
    title: "The Great Gatsby",
    year: 2013,
    rating: 7.2,
    duration: "143 دقیقه",
    bookTitle: "گتسبی بزرگ",
    author: "اف. اسکات فیتزجرالد",
    poster: "/assets/images/adaptations/great-gatsby.webp",
  },
];

export function Adaptations() {
  return (
    <AdaptationSection
      eyebrow="از کتاب تا پرده"
      title="اقتباس‌های سینمایی"
      description="فیلم‌هایی که داستانشان از دل کتاب‌ها به پرده سینما آمده است"
      adaptations={adaptations}
      icon={Clapperboard}
    />
  );
}