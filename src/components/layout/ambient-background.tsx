export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="
          absolute inset-x-0 top-0 h-168
          bg-[radial-gradient(ellipse_80%_55%_at_72%_0%,oklch(0.82_0.13_55/0.24),transparent_68%)]
          dark:bg-[radial-gradient(ellipse_80%_55%_at_72%_0%,oklch(0.66_0.19_48/0.28),transparent_68%)]
        "
      />

      <div
        className="
          absolute inset-x-0 top-0 h-120
          bg-[radial-gradient(ellipse_55%_45%_at_18%_4%,oklch(0.88_0.08_35/0.14),transparent_70%)]
          dark:bg-[radial-gradient(ellipse_55%_45%_at_18%_4%,oklch(0.42_0.12_315/0.14),transparent_70%)]
        "
      />

      <div
        className="
          absolute inset-x-0 top-0 h-128
          bg-linear-to-b
          from-orange-500/[0.035]
          via-transparent
          to-transparent
          dark:from-orange-400/4.5
        "
      />
    </div>
  );
}
