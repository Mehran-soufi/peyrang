"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  Clapperboard,
  FileText,
  Lightbulb,
  UserRound,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageBreadcrumb } from "../shared/page-breadcrumb";

const contributionTypes = [
  {
    id: "book_summary",
    label: "خلاصهٔ کتاب",
    description: "داستان و موضوع کتاب را معرفی کن.",
    icon: BookOpen,
    image: "/assets/images/community/contributions/book-summary.webp",
    fallbackImage: "/assets/images/books/the-blind-owl.webp",
    desktopPlacement:
      "lg:col-start-2 lg:row-start-1 lg:col-span-2 lg:row-span-2 lg:min-h-[436px]",
    subjectLabel: "عنوان کتاب",
    subjectPlaceholder: "مثلاً بوف کور",
    contentLabel: "خلاصهٔ کتاب",
    contentPlaceholder:
      "خلاصه‌ای روشن و با زبان خودت بنویس؛ پایان داستان را هم در صورت نیاز مشخص کن.",
  },
  {
    id: "author_bio",
    label: "زندگی‌نامهٔ نویسنده",
    description: "زندگی و مسیر ادبی یک نویسنده را کامل کن.",
    icon: UserRound,
    image: "/assets/images/community/contributions/author-biography.webp",
    fallbackImage: "/assets/images/authors/sadegh-hedayat.webp",
    desktopPlacement: "lg:col-start-1 lg:row-start-1 lg:min-h-0",
    subjectLabel: "نام نویسنده",
    subjectPlaceholder: "مثلاً صادق هدایت",
    contentLabel: "زندگی‌نامه",
    contentPlaceholder:
      "زندگی، آثار مهم و نکته‌های قابل‌استناد دربارهٔ نویسنده را بنویس.",
  },
  {
    id: "adaptation",
    label: "معرفی اقتباس",
    description: "فیلم یا سریالی را که از کتابی ساخته شده معرفی کن.",
    icon: Clapperboard,
    image: "/assets/images/community/contributions/adaptation.webp",
    fallbackImage: "/assets/images/adaptations/dune.webp",
    desktopPlacement: "lg:col-start-4 lg:row-start-1 lg:min-h-0",
    subjectLabel: "نام اقتباس و کتاب اصلی",
    subjectPlaceholder: "مثلاً نام فیلم — نام کتاب",
    contentLabel: "دربارهٔ اقتباس",
    contentPlaceholder: "اطلاعات اقتباس، سازندگان و ارتباطش با کتاب را بنویس.",
  },
  {
    id: "recommendation",
    label: "پیشنهاد برای پی‌رنگ",
    description: "کتاب، نویسنده یا اقتباسی را برای افزودن پیشنهاد بده.",
    icon: Lightbulb,
    image: "/assets/images/community/contributions/recommendation.webp",
    fallbackImage: "/assets/images/books/savushun.jpg",
    desktopPlacement: "lg:col-start-1 lg:row-start-2 lg:min-h-0",
    subjectLabel: "چه چیزی را پیشنهاد می‌کنی؟",
    subjectPlaceholder: "نام کتاب، نویسنده یا اقتباس",
    contentLabel: "دلیل پیشنهاد",
    contentPlaceholder: "بگو چرا این مورد برای خواننده‌های پی‌رنگ جذاب است.",
  },
  {
    id: "correction",
    label: "اصلاح اطلاعات",
    description: "اشتباه یا کمبود اطلاعات یک صفحه را گزارش کن.",
    icon: FileText,
    image: "/assets/images/community/contributions/correction.webp",
    fallbackImage: "/assets/images/community/community-cta.webp",
    desktopPlacement: "lg:col-start-4 lg:row-start-2",
    subjectLabel: "عنوان صفحه یا اثر",
    subjectPlaceholder: "نام کتاب، نویسنده یا اقتباس",
    contentLabel: "اطلاعات فعلی و اصلاح پیشنهادی",
    contentPlaceholder:
      "بنویس کدام بخش نیاز به اصلاح دارد و اطلاعات درست چیست.",
  },
] as const;

type ContributionType = (typeof contributionTypes)[number]["id"];

const fieldClassName =
  "w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15";

export function ContributionForm() {
  const [type, setType] = useState<ContributionType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [brokenImages, setBrokenImages] = useState<string[]>([]);
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);
  const selectedType = contributionTypes.find((item) => item.id === type);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowPreviewNotice(true);
  }

  function openForm(nextType: ContributionType) {
    setType(nextType);
    setShowPreviewNotice(false);
    setIsOpen(true);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      setType(null);
      setShowPreviewNotice(false);
    }
  }

  return (
    <div className="mx-auto w-[95%]">
      <PageBreadcrumb items={[{ label: "مشارکت کاربران" }]} />

      <header className="mb-8 max-w-3xl sm:mb-10">
        <p className="text-sm font-semibold text-orange-500">جامعهٔ پی‌رنگ</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          تو چه چیزی به دنیای پی‌رنگ اضافه می‌کنی؟
        </h1>
        <p className="mt-4 leading-8 text-muted-foreground">
          دانش و علاقه‌ات به کتاب را با دیگران به اشتراک بگذار؛ یک زندگی‌نامه
          بنویس، کتابی را خلاصه کن یا اقتباسی را معرفی کن.
        </p>
      </header>

      <section aria-label="انتخاب نوع مشارکت">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">از کجا شروع می‌کنی؟</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              یکی از موضوع‌ها را انتخاب کن تا فرم مخصوصش باز شود.
            </p>
          </div>
          <span className="hidden rounded-full border px-3 py-1.5 text-xs text-muted-foreground sm:inline-flex">
            ۵ راه برای مشارکت
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {contributionTypes.map(
            ({
              id,
              label,
              description,
              icon: Icon,
              image,
              fallbackImage,
              desktopPlacement,
            }) => {
              const resolvedImage = brokenImages.includes(id)
                ? fallbackImage
                : image;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => openForm(id)}
                  className={`group relative isolate min-h-72 overflow-hidden rounded-3xl border border-white/10 bg-card text-right shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${desktopPlacement} ${id === "correction" ? "lg:col-span-1" : ""}`}
                >
                  <Image
                    src={resolvedImage}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                    onError={() => {
                      if (!brokenImages.includes(id)) {
                        setBrokenImages((current) => [...current, id]);
                      }
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/70 to-black/5"
                  />
                  <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-black/30 text-orange-300 backdrop-blur-md">
                    <Icon className="size-5" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 block p-5 sm:p-6">
                    <span className="block text-xl font-black text-white">
                      {label}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-white/75">
                      {description}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md transition group-hover:border-orange-400/60 group-hover:bg-orange-500">
                      نوشتن مشارکت
                      <ArrowLeft className="size-3.5" />
                    </span>
                  </span>
                </button>
              );
            },
          )}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4 text-sm">
          <Check className="mt-0.5 size-4 shrink-0 text-orange-500" />
          <p className="leading-6 text-muted-foreground">
            نوشته‌ها پیش از انتشار توسط مدیران بررسی می‌شوند تا اطلاعات پی‌رنگ
            دقیق و قابل اعتماد بماند.
          </p>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="top-[8%] max-h-[84vh] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] translate-y-0 gap-0 overflow-y-auto rounded-2xl border-border/70 bg-background/95 p-0 shadow-2xl backdrop-blur-2xl sm:top-[10%] sm:w-[calc(100%-4rem)] sm:max-w-3xl"
        >
          {selectedType && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedType.label}</DialogTitle>
                <DialogDescription>
                  {selectedType.description}
                </DialogDescription>
              </DialogHeader>

              <div className="border-b border-border/60 p-5 sm:p-6">
                <DialogClose
                  aria-label="بستن فرم مشارکت"
                  className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <X className="size-4" />
                </DialogClose>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                    <selectedType.icon className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-black sm:text-xl">
                      {selectedType.label}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {selectedType.description}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 p-5 sm:p-6">
                  <label className="grid gap-2 text-sm font-semibold">
                    {selectedType.subjectLabel}
                    <input
                      key={`${type}-subject`}
                      name="subject"
                      required
                      maxLength={160}
                      placeholder={selectedType.subjectPlaceholder}
                      className={fieldClassName}
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-semibold">
                    {selectedType.contentLabel}
                    <textarea
                      key={`${type}-content`}
                      name="content"
                      required
                      minLength={40}
                      maxLength={8000}
                      rows={8}
                      placeholder={selectedType.contentPlaceholder}
                      className={`${fieldClassName} resize-y leading-7`}
                    />
                    <span className="font-normal text-muted-foreground">
                      متن باید دست‌نویس خودت باشد و منبع اطلاعات را در صورت
                      امکان ذکر کنی.
                    </span>
                  </label>

                  <label className="grid gap-2 text-sm font-semibold">
                    منبع یا پیوند مرجع{" "}
                    <span className="font-normal text-muted-foreground">
                      (اختیاری)
                    </span>
                    <input
                      name="source"
                      type="url"
                      placeholder="https://"
                      className={fieldClassName}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-4 border-t border-border/60 bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-xs leading-6 text-muted-foreground">
                    مشارکت پس از بررسی مدیران در بخش مربوط به خودش نمایش داده
                    می‌شود.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                  >
                    پیش‌نمایش ارسال برای بررسی
                    <ArrowLeft className="size-4" />
                  </button>
                </div>

                {showPreviewNotice && (
                  <p
                    role="status"
                    className="m-5 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-6 text-muted-foreground sm:mx-6"
                  >
                    این پیش‌نمایش فرم را نشان می‌دهد؛ هنوز چیزی ذخیره یا ارسال
                    نمی‌شود. برای دریافت واقعی مشارکت‌ها باید فرم به حساب کاربری
                    و صف بررسی مدیر متصل شود.
                  </p>
                )}
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
