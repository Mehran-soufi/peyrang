"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signIn } from "@/features/auth/actions/sign-in";
import { initialSignInState } from "@/features/auth/state";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "در حال ورود..." : "ورود"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    signIn,
    initialSignInState,
  );

  return (
    <section className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold">ورود به پی‌رنگ</h1>

        <p className="text-sm text-muted-foreground">
          برای ادامه وارد حساب خود شوید.
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              رمز عبور
            </label>

            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="رمز عبور"
            required
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />

          {state.fieldErrors?.password?.map((error) => (
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
        حساب ندارید؟{" "}
        <Link
          href="/register"
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          ثبت‌نام کنید
        </Link>
      </p>
    </section>
  );
}