"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { loginSchema } from "@/features/auth/schemas";
import type { SignInState } from "@/features/auth/state";
import { createClient } from "@/lib/supabase/server";

export async function signIn(
  _previousState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "اطلاعات واردشده را بررسی کنید.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: "ایمیل یا رمز عبور نادرست است.",
    };
  }

  const headersList = await headers();
  const origin =
    headersList.get("origin") ?? "http://localhost:3000";

  redirect(origin);
}