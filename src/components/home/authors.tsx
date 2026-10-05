import { LibraryBig } from "lucide-react";

import { AuthorSection } from "@/components/home/author-section";

const authors = [
  {
    name: "فئودور داستایفسکی",
    nationality: "روسیه",
    birthYear: 1821,
    deathYear: 1881,
    booksCount: 8,
    image: "/assets/images/authors/dostoevsky.webp",
  },
  {
    name: "لئو تولستوی",
    nationality: "روسیه",
    birthYear: 1828,
    deathYear: 1910,
    booksCount: 7,
    image: "/assets/images/authors/tolstoy.webp",
  },
  {
    name: "آلبر کامو",
    nationality: "فرانسه",
    birthYear: 1913,
    deathYear: 1960,
    booksCount: 6,
    image: "/assets/images/authors/camus.webp",
  },
  {
    name: "فرانتس کافکا",
    nationality: "اتریش-مجارستان",
    birthYear: 1883,
    deathYear: 1924,
    booksCount: 5,
    image: "/assets/images/authors/kafka.webp",
  },
  {
    name: "جورج اورول",
    nationality: "بریتانیا",
    birthYear: 1903,
    deathYear: 1950,
    booksCount: 5,
    image: "/assets/images/authors/orwell.webp",
  },
  {
    name: "گابریل گارسیا مارکز",
    nationality: "کلمبیا",
    birthYear: 1927,
    deathYear: 2014,
    booksCount: 6,
    image: "/assets/images/authors/marquez.webp",
  },
  {
    name: "صادق هدایت",
    nationality: "ایران",
    birthYear: 1281,
    deathYear: 1330,
    booksCount: 7,
    image: "/assets/images/authors/sadegh-hedayat.webp",
  },
  {
    name: "محمود دولت‌آبادی",
    nationality: "ایران",
    birthYear: 1319,
    booksCount: 5,
    image: "/assets/images/authors/dowlatabadi.webp",
  },
  {
    name: "هوشنگ گلشیری",
    nationality: "ایران",
    birthYear: 1316,
    deathYear: 1379,
    booksCount: 4,
    image: "/assets/images/authors/golshiri.webp",
  },
  {
    name: "سیمین دانشور",
    nationality: "ایران",
    birthYear: 1300,
    deathYear: 1390,
    booksCount: 4,
    image: "/assets/images/authors/simin-daneshvar.webp",
  },
];

export function Authors() {
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