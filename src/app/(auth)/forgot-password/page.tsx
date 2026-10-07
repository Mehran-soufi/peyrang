"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

import { forgotPassword } from "@/features/auth/actions/forgot-password";
import { AuthCard } from "@/features/auth/components/auth-card";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
};

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <AuthCard>
        <div className="space-y-6">
          <div className="space-y-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-orange-500"
            >
              <ArrowRight className="size-4" />
              بازگشت به ورود
            </Link>

            <div className="pt-2">
              <h1 className="text-2xl font-bold tracking-tight">
                بازیابی رمز عبور
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                ایمیل حساب خود را وارد کنید تا لینک بازیابی رمز عبور برایتان
                ارسال شود.
              </p>
            </div>
          </div>

          <form action={formAction} noValidate className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                ایمیل
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  disabled={isPending}
                  aria-invalid={Boolean(state.fieldErrors?.email?.length)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-10 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {state.fieldErrors?.email?.[0] && (
                <p className="text-xs text-destructive">
                  {state.fieldErrors.email[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "در حال ارسال..." : "ارسال لینک بازیابی"}
            </button>
          </form>
        </div>
      </AuthCard>
    </main>
  );
}
