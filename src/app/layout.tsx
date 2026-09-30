import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "پی‌رنگ | دنیای کتاب و اقتباس",
    template: "%s | پی‌رنگ",
  },
  description:
    "پی‌رنگ؛ پلتفرمی برای کشف، معرفی و دنبال کردن کتاب‌ها و اقتباس‌های سینمایی و تلویزیونی.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
