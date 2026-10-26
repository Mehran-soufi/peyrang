export default function BooksLoading() {
  return (
    <main
      aria-label="در حال بارگذاری کتاب‌ها"
      aria-busy="true"
      className="mx-auto min-h-screen w-[95%] max-w-7xl pt-20 pb-24 sm:pt-28 sm:pb-12"
    >
      <div className="mb-8 animate-pulse">
        <div className="h-9 w-48 rounded-lg bg-muted" />
        <div className="mt-4 h-4 w-72 max-w-full rounded bg-muted" />
        <div className="mt-5 h-4 w-24 rounded bg-muted" />
      </div>

      <div className="mb-8 animate-pulse rounded-2xl border border-border p-4 sm:p-5">
        <div className="h-11 w-full max-w-xs rounded-xl bg-muted" />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index}>
              <div className="mb-2 h-4 w-16 rounded bg-muted" />
              <div className="h-11 rounded-xl bg-muted" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 h-4 w-24 animate-pulse rounded bg-muted" />

      <section
        aria-label="در حال بارگذاری فهرست کتاب‌ها"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-2/3 rounded-2xl bg-muted" />
            <div className="mt-3 h-4 w-3/4 rounded bg-muted" />
            <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
          </div>
        ))}
      </section>
    </main>
  );
}
