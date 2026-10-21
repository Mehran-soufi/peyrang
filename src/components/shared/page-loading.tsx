import Image from "next/image";

export function PageLoading() {
  return (
    <div
      role="status"
      aria-label="در حال بارگذاری صفحه"
      className="flex h-screen flex-col items-center justify-center gap-6"
      dir="rtl"
    >
      <div className="relative flex size-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-orange-500/15 border-t-orange-500" />

        <Image
          src="/assets/icon/payrang-icon.png"
          alt=""
          width={40}
          height={40}
          priority
          className="size-10 object-contain"
        />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold text-foreground">پی‌رنگ</p>

        <p className="text-xs text-muted-foreground">
          در حال آماده‌سازی دنیای کتاب‌ها...
        </p>
      </div>

      <span className="sr-only">در حال بارگذاری</span>
    </div>
  );
}
