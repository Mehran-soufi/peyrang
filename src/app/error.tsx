"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, House, RefreshCw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // اینجا می‌توان خطا را در آینده به سرویس ثبت خطا ارسال کرد.
    console.error("Peyrang application error:", error);
  }, [error]);

  return (
    <main
      dir="rtl"
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-5 py-16"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-10 size-80 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 size-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* Book illustration */}
        <div className="relative mb-5 w-full max-w-xs">
          <div className="absolute inset-x-10 bottom-3 h-10 rounded-full bg-orange-500/10 blur-2xl" />

          <svg
            viewBox="0 0 320 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-auto w-full"
            role="img"
            aria-label="کتاب بازی با مسیر نارنجی و علامت خطا"
          >
            <circle cx="58" cy="57" r="3" fill="#F97316" opacity=".5" />
            <circle cx="260" cy="44" r="4" fill="#F97316" opacity=".4" />
            <path
              d="M160 132 C139 114 112 109 76 117 V174 C111 166 139 173 160 190 Z"
              fill="#F5F5F4"
              stroke="#D6D3D1"
              strokeWidth="1.5"
            />
            <path
              d="M160 132 C181 114 208 109 244 117 V174 C209 166 181 173 160 190 Z"
              fill="#FFFBEB"
              stroke="#D6D3D1"
              strokeWidth="1.5"
            />
            <path d="M160 132 V190" stroke="#D6D3D1" strokeWidth="2" />
            <path
              d="M88 131 C111 126 132 134 146 143 M88 145 C111 140 132 148 146 157 M174 143 C190 134 210 126 232 131 M174 157 C190 148 210 140 232 145"
              stroke="#D6D3D1"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M70 109 C105 99 137 111 160 130 V184 C137 165 105 153 70 163 Z"
              fill="#EA580C"
            />
            <path
              d="M160 130 C183 111 215 99 250 109 V163 C215 153 183 165 160 184 Z"
              fill="#C2410C"
            />
            <path d="M160 130 V184" stroke="#9A3412" strokeWidth="2" />
            <path
              d="M160 130 C144 112 175 101 158 84 C147 73 131 79 128 63"
              stroke="#F97316"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="128" cy="58" r="12" fill="#F97316" opacity=".15" />
            <circle cx="128" cy="58" r="7" fill="#F97316" />
            <circle cx="249" cy="68" r="17" fill="#F97316" opacity=".1" />
            <path
              d="M249 59 V69 M249 76 V77"
              stroke="#EA580C"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-orange-500/50" />
          <span className="text-sm font-bold tracking-wide text-orange-500">
            یک وقفه در داستان
          </span>
          <span className="h-px w-8 bg-orange-500/50" />
        </div>

        <h1 className="text-2xl font-black leading-relaxed tracking-tight sm:text-4xl">
          انگار ورقِ این داستان{" "}
          <span className="text-orange-500">گیر کرده!</span>
        </h1>

        <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground sm:text-base">
          یه مشکلی پیش اومده و نتونستیم این صفحه رو درست نمایش بدیم. نگران نباش،
          می‌تونی دوباره تلاش کنی یا از مسیر دیگه‌ای ادامه بدی.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            <RefreshCw className="size-4" />
            تلاش دوباره
          </button>

          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3.5 text-sm font-semibold transition hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            <House className="size-4" />
            بازگشت به صفحه اصلی
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        <p className="mt-12 text-xs text-muted-foreground/70">
          پی‌رنگ؛ از کتاب تا پرده
        </p>
      </div>
    </main>
  );
}
