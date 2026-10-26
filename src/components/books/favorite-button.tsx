"use client";

import { useEffect, useState } from "react";
import { Heart, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

type FavoriteButtonProps = {
  bookId: string;
};

export function FavoriteButton({ bookId }: FavoriteButtonProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorite() {
      const supabase = createClient();

      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !authData.user) {
        setUserId(null);
        setIsFavorite(false);
        setIsLoading(false);
        return;
      }

      setUserId(authData.user.id);

      const { data, error } = await supabase
        .from("favorites")
        .select("book_id")
        .eq("user_id", authData.user.id)
        .eq("book_id", bookId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Load favorite error:", error);
      } else {
        setIsFavorite(Boolean(data));
      }

      setIsLoading(false);
    }

    loadFavorite();

    return () => {
      cancelled = true;
    };
  }, [bookId]);

  async function handleToggleFavorite() {
    if (isLoading) return;

    if (!userId) {
      toast.info(
        "برای افزودن کتاب به علاقه‌مندی‌ها ابتدا وارد حساب کاربری شوید.",
      );
      return;
    }

    setIsLoading(true);

    const supabase = createClient();

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("book_id", bookId);

      if (error) {
        toast.error("حذف کتاب از علاقه‌مندی‌ها ناموفق بود.");
        console.error("Remove favorite error:", error);
      } else {
        setIsFavorite(false);
        toast.success("کتاب از علاقه‌مندی‌ها حذف شد.");
      }
    } else {
      const { error } = await supabase.from("favorites").insert({
        user_id: userId,
        book_id: bookId,
      });

      if (error) {
        toast.error("افزودن کتاب به علاقه‌مندی‌ها ناموفق بود.");
        console.error("Add favorite error:", error);
      } else {
        setIsFavorite(true);
        toast.success("کتاب به علاقه‌مندی‌ها اضافه شد.");
      }
    }

    setIsLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      aria-label={
        isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
      }
      aria-pressed={isFavorite}
      title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={`inline-flex size-10 items-center justify-center
        rounded-xl border transition-colors
        disabled:cursor-wait disabled:opacity-60
        ${
          isFavorite
            ? "border-orange-500/40 bg-orange-500/10 text-orange-500"
            : "border-border/70 bg-background/40 text-muted-foreground hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-500"
        }`}
    >
      {isLoading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Heart className={`size-4 ${isFavorite ? "fill-current" : ""}`} />
      )}
    </button>
  );
}
