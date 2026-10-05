"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { signUp } from "@/features/auth/actions/sign-up";
import { initialSignUpState } from "@/features/auth/state";

type ClientErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
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
      {pending ? "در حال ایجاد حساب..." : "ایجاد حساب"}
    </button>
  );
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    signUp,
    initialSignUpState,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.success) {
      toast.success("حساب شما ایجاد شد", {
        description: state.message,
      });
    } else if (!state.fieldErrors) {
      toast.error("ثبت‌نام انجام نشد", {
        description: state.message,
      });
    }
  }, [state]);

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    const errors: ClientErrors = {};

    if (!email) {
      errors.email = "ایمیل را وارد کنید.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "فرمت ایمیل واردشده صحیح نیست.";
    }

    if (!password) {
      errors.password = "رمز عبور را وارد کنید.";
    } else if (password.length < 8) {
      errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "تکرار رمز عبور را وارد کنید.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "رمزهای عبور با یکدیگر مطابقت ندارند.";
    }

    setClientErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!validateForm(event.currentTarget)) {
      event.preventDefault();
    }
  };

  if (state.success) {
    return (
      <div className="py-2 text-center">
        <div
          className="
            mx-auto flex size-14 items-center justify-center
            rounded-2xl
            border border-orange-500/20
            bg-orange-500/10
            text-orange-500
          "
          aria-hidden="true"
        >
          ✓
        </div>

        <div className="mt-5 space-y-2">
          <h1 className="text-xl font-black tracking-tight sm:text-2xl">
            حساب شما ایجاد شد
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            {state.message}
          </p>

          <p className="pt-1 text-xs leading-5 text-muted-foreground">
            اگر ایمیل را دریافت نکردید، پوشه Spam یا Junk را هم بررسی کنید.
          </p>
        </div>

        <Link
          href="/login"
          className="
            mt-6 inline-flex h-10 items-center justify-center
            rounded-xl
            border border-border/70
            bg-background
            px-5
            text-sm font-semibold
            transition-all duration-300
            hover:border-orange-500/40
            hover:bg-orange-500/5
            hover:text-orange-500
          "
        >
          رفتن به صفحه ورود
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 space-y-1.5">
        <h1 className="text-xl font-black tracking-tight sm:text-2xl">
          به پی‌رنگ بپیوند
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          حساب خود را بساز و وارد دنیای کتاب‌ها شو.
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
          <label
            htmlFor="email"
            className="text-sm font-semibold"
          >
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
              <p
                key={error}
                className="text-xs font-medium text-destructive"
              >
                {error}
              </p>
            ))}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold"
          >
            رمز عبور
          </label>

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
              autoComplete="new-password"
              placeholder="حداقل ۸ کاراکتر"
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
                showPassword
                  ? "مخفی کردن رمز عبور"
                  : "نمایش رمز عبور"
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
              <p
                key={error}
                className="text-xs font-medium text-destructive"
              >
                {error}
              </p>
            ))}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-semibold"
          >
            تکرار رمز عبور
          </label>

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
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="رمز عبور را دوباره وارد کنید"
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
                  clientErrors.confirmPassword
                    ? "border-destructive focus:border-destructive focus:ring-destructive/15"
                    : "border-border/70 focus:border-orange-500/60 focus:ring-orange-500/10"
                }
              `}
            />

            <button
              type="button"
              aria-label={
                showConfirmPassword
                  ? "مخفی کردن رمز عبور"
                  : "نمایش رمز عبور"
              }
              onClick={() =>
                setShowConfirmPassword((value) => !value)
              }
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
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {clientErrors.confirmPassword && (
            <p className="text-xs font-medium text-destructive">
              {clientErrors.confirmPassword}
            </p>
          )}

          {!clientErrors.confirmPassword &&
            state.fieldErrors?.confirmPassword?.map((error) => (
              <p
                key={error}
                className="text-xs font-medium text-destructive"
              >
                {error}
              </p>
            ))}
        </div>

        {/* Server error */}
        {state.message && !state.success && state.fieldErrors && (
          <div
            role="alert"
            className="
              rounded-xl
              border border-destructive/15
              bg-destructive/5
              px-3.5 py-3
              text-sm leading-6
              text-destructive
            "
          >
            اطلاعات واردشده را بررسی کنید.
          </div>
        )}

        <SubmitButton pending={pending} />
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        قبلاً حساب ساخته‌اید؟{" "}
        <Link
          href="/login"
          className="
            font-semibold text-foreground
            transition-colors
            hover:text-orange-500
          "
        >
          ورود
        </Link>
      </p>
    </div>
  );
}