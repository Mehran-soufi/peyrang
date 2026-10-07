"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "ایمیل را وارد کنید.")
        .email("فرمت ایمیل صحیح نیست."),
});

export type ForgotPasswordState = {
    success: boolean;
    message: string;
    fieldErrors?: {
        email?: string[];
    };
};

export async function forgotPassword(
    _prevState: ForgotPasswordState,
    formData: FormData,
): Promise<ForgotPasswordState> {
    const email = String(formData.get("email") ?? "");

    const result = forgotPasswordSchema.safeParse({
        email,
    });

    if (!result.success) {
        return {
            success: false,
            message: "",
            fieldErrors: result.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();

    const origin = process.env.NEXT_PUBLIC_SITE_URL;

    if (!origin) {
        return {
            success: false,
            message: "آدرس سایت تنظیم نشده است.",
        };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
        result.data.email,
        {
            redirectTo: `${origin}/auth/callback?next=/update-password`,
        },
    );

    if (error) {
        return {
            success: false,
            message: "ارسال لینک بازیابی رمز عبور انجام نشد.",
        };
    }

    return {
        success: true,
        message:
            "اگر این ایمیل در پی‌رنگ ثبت شده باشد، لینک بازیابی برای شما ارسال خواهد شد.",
    };
}