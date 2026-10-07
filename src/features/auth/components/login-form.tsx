"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { signIn } from "@/features/auth/actions/sign-in";
import { initialSignInState } from "@/features/auth/state";
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();

type ClientErrors = {
  email?: string;
  password?: string;
};

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="
        flex h-11 w-full items-center justify-center
        rounded-xl
        bg-orange-500
        px-4
        text-sm font-bold text-white
        shadow-lg shadow-orange-500/15
        transition-all duration-300
        hover:bg-orange-400
        hover:shadow-orange-500/20
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {pending ? "در حال ورود..." : "ورود به پی‌رنگ"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    signIn,
    initialSignInState,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  useEffect(() => {
    if (!state.message || state.success || state.fieldErrors) {
      return;
    }

    toast.error("ورود انجام نشد", {
      description: state.message,
    });
  }, [state]);

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const errors: ClientErrors = {};

    if (!email) {
      errors.email = "ایمیل را وارد کنید.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "فرمت ایمیل واردشده صحیح نیست.";
    }

    if (!password) {
      errors.password = "رمز عبور را وارد کنید.";
    }

    setClientErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!validateForm(event.currentTarget)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (searchParams.get("password-reset") !== "success") {
      return;
    }

    toast.success("رمز عبور تغییر کرد", {
      description: "حالا می‌توانید با رمز عبور جدید وارد پی‌رنگ شوید.",
    });
  }, [searchParams]);

  return (
    <div>
      <div className="mb-6 space-y-1.5">
        <h1 className="text-xl font-black tracking-tight sm:text-2xl">
          خوش برگشتی
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          برای ادامه، وارد حساب پی‌رنگ خود شوید.
        </p>
      </div>

      <form
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            ایمیل
          </label>

          <div className="relative">
            <Mail
              aria-hidden="true"
              className="
                pointer-events-none
                absolute right-3 top-1/2
                size-4 -translate-y-1/2
                text-muted-foreground
              "
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="example@email.com"
              className={`
                h-11 w-full rounded-xl
                border
                bg-background/70
                pr-10 pl-3
                text-sm
                outline-none
                transition-all duration-200
                placeholder:text-muted-foreground/60
                focus:ring-2
                ${
                  clientErrors.email
                    ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                    : "border-border/70 focus:border-orange-500/60 focus:ring-orange-500/10"
                }
              `}
            />
          </div>

          {clientErrors.email && (
            <p className="text-xs font-medium text-destructive">
              {clientErrors.email}
            </p>
          )}

          {!clientErrors.email &&
            state.fieldErrors?.email?.map((error) => (
              <p key={error} className="text-xs font-medium text-destructive">
                {error}
              </p>
            ))}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="password" className="text-sm font-semibold">
              رمز عبور
            </label>

            <Link
              href="/forgot-password"
              className="
                text-xs font-medium
                text-muted-foreground
                transition-colors
                hover:text-orange-500
              "
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole
              aria-hidden="true"
              className="
                pointer-events-none
                absolute right-3 top-1/2
                size-4 -translate-y-1/2
                text-muted-foreground
              "
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="رمز عبور"
              className={`
                h-11 w-full rounded-xl
                border
                bg-background/70
                px-10
                text-sm
                outline-none
                transition-all duration-200
                placeholder:text-muted-foreground/60
                focus:ring-2
                ${
                  clientErrors.password
                    ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                    : "border-border/70 focus:border-orange-500/60 focus:ring-orange-500/10"
                }
              `}
            />

            <button
              type="button"
              aria-label={
                showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
              }
              onClick={() => setShowPassword((value) => !value)}
              className="
                absolute left-3 top-1/2
                flex size-7 -translate-y-1/2
                items-center justify-center
                rounded-lg
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {clientErrors.password && (
            <p className="text-xs font-medium text-destructive">
              {clientErrors.password}
            </p>
          )}

          {!clientErrors.password &&
            state.fieldErrors?.password?.map((error) => (
              <p key={error} className="text-xs font-medium text-destructive">
                {error}
              </p>
            ))}
        </div>

        <SubmitButton pending={pending} />
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        حساب ندارید؟{" "}
        <Link
          href="/register"
          className="
            font-semibold text-foreground
            transition-colors
            hover:text-orange-500
          "
        >
          ثبت‌نام کنید
        </Link>
      </p>
    </div>
  );
}
