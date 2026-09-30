"use server";

import { headers } from "next/headers";

import { registerSchema } from "@/features/auth/schemas";
import {
  type SignUpState,
} from "@/features/auth/state";
import { createClient } from "@/lib/supabase/server";

export async function signUp(
  _previousState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "اطلاعات واردشده را بررسی کنید.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const headersList = await headers();
  const origin =
    headersList.get("origin") ?? "http://localhost:3000";

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  if (!data.session) {
    return {
      success: true,
      message:
        "حساب شما ایجاد شد. برای فعال‌سازی حساب، لینک ارسالشده به ایمیل خود را تأیید کنید.",
    };
  }

  return {
    success: true,
    message: "حساب شما با موفقیت ایجاد شد.",
  };
}