"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const updatePasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),
        confirmPassword: z
            .string()
            .min(1, "تکرار رمز عبور را وارد کنید."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "تکرار رمز عبور با رمز عبور یکسان نیست.",
    });

export type UpdatePasswordState = {
    success: boolean;
    message: string;
    fieldErrors?: {
        password?: string[];
        confirmPassword?: string[];
    };
};

export async function updatePassword(
    _prevState: UpdatePasswordState,
    formData: FormData,
): Promise<UpdatePasswordState> {
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    const result = updatePasswordSchema.safeParse({
        password,
        confirmPassword,
    });

    if (!result.success) {
        return {
            success: false,
            message: "",
            fieldErrors: result.error.flatten().fieldErrors,
        };
    }

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            message: "نشست بازیابی رمز عبور معتبر نیست.",
        };
    }

    const { error } = await supabase.auth.updateUser({
        password: result.data.password,
    });

    if (error) {
        return {
            success: false,
            message: "تغییر رمز عبور انجام نشد.",
        };
    }

    await supabase.auth.signOut();

    redirect("/login?password-reset=success");
}