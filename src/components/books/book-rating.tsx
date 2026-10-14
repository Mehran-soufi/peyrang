import { Star } from "lucide-react";

export function BookRating() {
  return (
    <section className="w-full min-w-0">
      <div className="rounded-2xl border border-border/60 bg-background/45 p-6 backdrop-blur-md sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-orange-500" />
              <h2 className="text-xl font-black">امتیاز و نقدها</h2>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              نظر کاربران درباره این کتاب
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <Star className="size-5 fill-orange-500 text-orange-500" />
                <span className="text-2xl font-black">—</span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">بدون امتیاز</p>
            </div>

            <div className="h-10 w-px bg-border/60" />

            <div className="text-center">
              <p className="text-2xl font-black">۰</p>
              <p className="mt-1 text-xs text-muted-foreground">نقد و نظر</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">
          <p className="text-sm font-medium">
            هنوز نقدی برای این کتاب ثبت نشده است.
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            اولین نفری باشید که درباره این کتاب نظر می‌دهد.
          </p>
        </div>
      </div>
    </section>
  );
}
