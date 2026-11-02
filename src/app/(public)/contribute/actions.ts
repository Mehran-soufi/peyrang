"use server";

import { createClient } from "@/lib/supabase/server";

const contributionTypes = [
  "book_summary",
  "author_bio",
  "adaptation",
  "recommendation",
  "correction",
] as const;

type ContributionType = (typeof contributionTypes)[number];

export type ContributionResult = {
  success: boolean;
  message: string;
};

export async function submitContribution(
  formData: FormData,
): Promise<ContributionResult> {
  const type = formData.get("type");
  const subject = formData.get("subject");
  const content = formData.get("content");
  const source = formData.get("source");

  if (
    typeof type !== "string" ||
    !contributionTypes.includes(type as ContributionType)
  ) {
    return {
      success: false,
      message: "نوع مشارکت معتبر نیست.",
    };
  }

  if (typeof subject !== "string" || typeof content !== "string") {
    return {
      success: false,
      message: "لطفاً عنوان و متن مشارکت را وارد کن.",
    };
  }

  const cleanSubject = subject.trim();
  const cleanContent = content.trim();
  const cleanSource = typeof source === "string" ? source.trim() : "";

  if (cleanSubject.length < 1 || cleanSubject.length > 160) {
    return {
      success: false,
      message: "عنوان باید حداکثر ۱۶۰ کاراکتر باشد.",
    };
  }

  if (cleanContent.length < 40 || cleanContent.length > 8000) {
    return {
      success: false,
      message: "متن مشارکت باید بین ۴۰ تا ۸۰۰۰ کاراکتر باشد.",
    };
  }

  let sourceUrl: string | null = null;

  if (cleanSource) {
    try {
      const parsedUrl = new URL(cleanSource);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }

      sourceUrl = parsedUrl.toString();
    } catch {
      return {
        success: false,
        message: "پیوند منبع معتبر نیست.",
      };
    }
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "برای ثبت مشارکت ابتدا وارد حساب کاربری‌ات شو.",
    };
  }

  const { error } = await supabase.from("contributions").insert({
    user_id: user.id,
    type,
    subject: cleanSubject,
    content: cleanContent,
    source_url: sourceUrl,
  });

  if (error) {
    console.error("Contribution submission error:", error);

    return {
      success: false,
      message: "ثبت مشارکت انجام نشد. لطفاً دوباره تلاش کن.",
    };
  }

  return {
    success: true,
    message: "مشارکتت با موفقیت ثبت شد و پس از بررسی مدیران منتشر می‌شود.",
  };
}