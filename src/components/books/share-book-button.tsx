"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { toast } from "sonner";

type ShareBookButtonProps = {
  title: string;
};

export function ShareBookButton({ title }: ShareBookButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const shareData = {
      title: `${title} | پی‌رنگ`,
      text: `معرفی کتاب ${title} در پی‌رنگ`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("لینک کتاب کپی شد.");

      window.setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error("Share book error:", error);
      toast.error("اشتراک‌گذاری انجام نشد. لطفاً دوباره تلاش کنید.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="اشتراک‌گذاری کتاب"
      title="اشتراک‌گذاری کتاب"
      className="inline-flex size-10 items-center justify-center rounded-xl border border-border/70 bg-background/50 text-muted-foreground backdrop-blur-md transition-all hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-500"
    >
      {isCopied ? (
        <Check className="size-4" />
      ) : (
        <Share2 className="size-4" />
      )}
    </button>
  );
}
