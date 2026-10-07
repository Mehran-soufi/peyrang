export function BookCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="
        relative aspect-2/3
        w-full
        overflow-hidden
        rounded-2xl
        bg-muted
        shadow-sm
        ring-1 ring-black/5
        dark:ring-white/10
      "
    >
      <div className="absolute inset-0 animate-pulse bg-muted" />

      <div className="absolute inset-x-0 bottom-0 space-y-2 px-3 pb-3.5 sm:px-3.5 sm:pb-4">
        <div className="h-4 w-3/4 rounded-md bg-background/60" />
        <div className="h-3 w-1/2 rounded-md bg-background/40" />
      </div>
    </div>
  );
}