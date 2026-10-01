import { AmbientBackground } from "@/components/layout/ambient-background";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AmbientBackground />

      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
