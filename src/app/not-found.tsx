import Link from "next/link";
import { ArrowLeft, BookOpen, House } from "lucide-react";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16"
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
        <div className="relative mb-2 w-full max-w-sm">
          <div className="absolute inset-x-12 bottom-5 h-12 rounded-full bg-orange-500/10 blur-2xl" />

          <svg
            viewBox="0 0 420 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-auto w-full overflow-visible"
            role="img"
            aria-label="کتاب بازی که مسیری نارنجی از صفحات آن بیرون آمده است"
          >
            {/* Floating decorative elements */}
            <circle cx="70" cy="90" r="4" fill="#F97316" opacity=".5" />
            <circle cx="345" cy="70" r="5" fill="#F97316" opacity=".35" />
            <circle cx="320" cy="120" r="2.5" fill="#F97316" opacity=".6" />

            <path
              d="M87 65 L87 81 M79 73 L95 73"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".55"
            />
            <path
              d="M344 150 L344 162 M338 156 L350 156"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".45"
            />

            {/* Small floating book */}
            <g transform="translate(315 83) rotate(12)">
              <rect
                x="0"
                y="0"
                width="30"
                height="39"
                rx="3"
                fill="#F97316"
                opacity=".9"
              />
              <path
                d="M7 9 H23 M7 14 H20 M7 19 H22"
                stroke="#FFF7ED"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M15 0 V39"
                stroke="#C2410C"
                strokeWidth="1"
                opacity=".4"
              />
            </g>

            {/* Ground shadow */}
            <ellipse
              cx="210"
              cy="258"
              rx="137"
              ry="14"
              fill="#F97316"
              opacity=".09"
            />

            {/* Left pages */}
            <path
              d="M208 205 C174 181 119 169 73 184 L73 232 C121 219 172 233 208 255 Z"
              fill="#D6D3D1"
              opacity=".45"
            />
            <path
              d="M208 197 C171 170 119 157 73 174 L73 222 C121 209 172 223 208 245 Z"
              fill="#F5F5F4"
              stroke="#D6D3D1"
              strokeWidth="1.5"
            />
            <path
              d="M208 189 C169 162 118 149 73 166 L73 214 C121 201 172 215 208 237 Z"
              fill="#FFFBEB"
              stroke="#E7E5E4"
              strokeWidth="1.5"
            />
            <path
              d="M91 177 C126 168 162 181 190 195 M91 190 C126 181 162 194 190 208 M91 203 C126 194 162 207 190 221"
              stroke="#D6D3D1"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Right pages */}
            <path
              d="M212 205 C248 181 302 169 347 184 L347 232 C300 219 249 233 212 255 Z"
              fill="#D6D3D1"
              opacity=".45"
            />
            <path
              d="M212 197 C249 170 301 157 347 174 L347 222 C300 209 249 223 212 245 Z"
              fill="#F5F5F4"
              stroke="#D6D3D1"
              strokeWidth="1.5"
            />
            <path
              d="M212 189 C251 162 302 149 347 166 L347 214 C300 201 249 215 212 237 Z"
              fill="#FFFBEB"
              stroke="#E7E5E4"
              strokeWidth="1.5"
            />
            <path
              d="M230 195 C258 181 294 168 329 177 M230 208 C258 194 294 181 329 190 M230 221 C258 207 294 194 329 203"
              stroke="#D6D3D1"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Book cover */}
            <path
              d="M67 163 C116 145 170 161 210 190 V244 C170 215 116 199 67 217 Z"
              fill="#EA580C"
            />
            <path
              d="M210 190 C250 161 304 145 353 163 V217 C304 199 250 215 210 244 Z"
              fill="#C2410C"
            />

            {/* Spine */}
            <path
              d="M210 190 V244"
              stroke="#9A3412"
              strokeWidth="2"
              opacity=".7"
            />

            {/* Winding story path */}
            <path
              d="M210 189 C199 171 222 158 209 142 C195 125 163 139 160 119 C157 103 182 97 202 106 C229 118 244 102 230 83"
              stroke="#F97316"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M210 189 C199 171 222 158 209 142 C195 125 163 139 160 119 C157 103 182 97 202 106 C229 118 244 102 230 83"
              stroke="#FDBA74"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 8"
            />

            {/* Destination dot */}
            <circle cx="230" cy="79" r="9" fill="#F97316" opacity=".15" />
            <circle cx="230" cy="79" r="4.5" fill="#F97316" />
          </svg>
        </div>

        {/* 404 label */}
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-orange-500/50" />
          <span className="text-sm font-bold tracking-[0.2em] text-orange-500">
            خطای ۴۰۴
          </span>
          <span className="h-px w-8 bg-orange-500/50" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-black leading-relaxed tracking-tight sm:text-4xl">
          انگار این صفحه از{" "}
          <span className="relative inline-block text-orange-500">
            داستان
            <svg
              aria-hidden="true"
              viewBox="0 0 120 8"
              className="absolute -bottom-1 right-0 w-full"
              fill="none"
            >
              <path
                d="M3 5 C30 1 76 1 117 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          جا مونده!
        </h1>

        <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground sm:text-base">
          صفحه‌ای که دنبالش می‌گردی پیدا نشد؛ شاید مسیر داستان عوض شده باشه.
          نگران نباش، هنوز کلی کتاب برای کشف کردن داریم.
        </p>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            <House className="size-4" />
            بازگشت به صفحه اصلی
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          </Link>

          <Link
            href="/books"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3.5 text-sm font-semibold transition hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto"
          >
            <BookOpen className="size-4" />
            گشت‌وگذار بین کتاب‌ها
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-xs text-muted-foreground/70">
          پی‌رنگ؛ از کتاب تا پرده
        </p>
      </div>
    </main>
  );
}
