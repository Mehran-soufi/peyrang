"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signUp } from "@/features/auth/actions/sign-up";
import { initialSignUpState } from "@/features/auth/state";
function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "در حال ایجاد حساب..." : "ایجاد حساب"}
    </button>
  );
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    signUp,
    initialSignUpState,
  );

  if (state.success) {
    return (
      <section className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
        <div className="space-y-3 text-center">
          <div
            className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"
            aria-hidden="true"
          >
            ✓
          </div>

          <h1 className="text-2xl font-bold">حساب شما ایجاد شد</h1>

          <p className="text-sm leading-6 text-muted-foreground">
            {state.message}
          </p>

          <p className="text-xs leading-5 text-muted-foreground">
            اگر ایمیل را دریافت نکردید، پوشه Spam یا Junk را هم بررسی کنید.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold">ایجاد حساب</h1>

        <p className="text-sm text-muted-foreground">
          برای پیوستن به پی‌رنگ حساب خود را ایجاد کنید.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            ایمیل
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            required
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {state.fieldErrors?.email?.map((error) => (
            <p key={error} className="text-xs text-destructive">
              {error}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            رمز عبور
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="حداقل ۸ کاراکتر"
            required
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {state.fieldErrors?.password?.map((error) => (
            <p key={error} className="text-xs text-destructive">
              {error}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            تکرار رمز عبور
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="رمز عبور را دوباره وارد کنید"
            required
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {state.fieldErrors?.confirmPassword?.map((error) => (
            <p key={error} className="text-xs text-destructive">
              {error}
            </p>
          ))}
        </div>

        {state.message && !state.success && (
          <p
            role="alert"
            className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {state.message}
          </p>
        )}

        <SubmitButton pending={pending} />
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        قبلاً حساب ساخته‌اید؟{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          ورود
        </Link>
      </p>
    </section>
  );
}
