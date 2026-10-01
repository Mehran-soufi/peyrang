export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} پی‌رنگ. همه حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}