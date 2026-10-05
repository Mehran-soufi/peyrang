import Image from "next/image";
import { ArrowLeft, BookOpen, PenLine, Sparkles } from "lucide-react";

const activities = [
  {
    label: "نوشتن نقد",
    icon: PenLine,
  },
  {
    label: "خلاصه کتاب",
    icon: BookOpen,
  },
  {
    label: "معرفی کتاب",
    icon: Sparkles,
  },
];

export function CommunityCta() {
  return (
    <section
      aria-labelledby="community-cta-title"
      className="relative w-full overflow-hidden px-4 py-8 sm:px-6 sm:py-10 select-none"
    >
      <div className="relative mx-auto w-[95%] h-[70vh] min-w-0 overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/10">
        {/* Background Image */}
        <Image
          src="/assets/images/community/community-cta.webp"
          alt=""
          fill
          sizes="95vw"
          className="object-cover object-center"
        />

        {/* Dark Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-l from-black/80 via-black/50 to-black/35"
        />

        {/* Orange Glow */}
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-72 rounded-full bg-orange-500/20 blur-[100px]"
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-80 items-center px-6 py-10 sm:min-h-96 sm:px-10 sm:py-12 lg:px-14">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-2 text-orange-400">
              <Sparkles className="size-4" />

              <span className="text-xs font-semibold sm:text-sm">
                جامعه پی‌رنگ
              </span>
            </div>

            {/* Title */}
            <h2
              id="community-cta-title"
              className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              تو هم بخشی از داستان باش
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              نقدت را بنویس، کتابی معرفی کن یا تجربه‌ات را با دیگر خواننده‌ها به
              اشتراک بگذار.
            </p>

            {/* Activities */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {activities.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-medium text-white/85 backdrop-blur-md"
                >
                  <Icon className="size-3.5 text-orange-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition-all duration-300 hover:bg-orange-400 hover:shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>شروع مشارکت</span>
              <ArrowLeft className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
