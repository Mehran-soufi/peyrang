export default function Loading() {
  return (
    <main
      aria-label="در حال بارگذاری صفحه"
      aria-busy="true"
      className="mx-auto min-h-screen w-[95%] max-w-7xl px-4 pt-24 pb-24 sm:px-6 sm:pt-32 sm:pb-12"
    >
      <div className="mb-8 animate-pulse">
        <div className="h-4 w-28 rounded bg-muted" />
        <div className="mt-3 h-9 w-56 rounded-lg bg-muted" />
        <div className="mt-4 h-4 w-80 max-w-full rounded bg-muted" />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-4">
              <div className="size-20 shrink-0 rounded-xl bg-muted" />
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
                <div className="h-3 w-2/3 rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
