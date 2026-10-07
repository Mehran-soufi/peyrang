"use client";

import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { updatePassword } from "@/features/auth/actions/update-password";
import { AuthCard } from "@/features/auth/components/auth-card";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
};

type ClientErrors = {
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
      {pending ? "در حال تغییر رمز..." : "تغییر رمز عبور"}
    </button>
  );
}

export default function UpdatePasswordPage() {
  const [state, formAction, pending] = useActionState(
    updatePassword,
    initialState,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error("تغییر رمز انجام نشد", {
        description: state.message,
      });
    }
  }, [state]);

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    const errors: ClientErrors = {};

    if (!password) {
      errors.password = "رمز عبور جدید را وارد کنید.";
    } else if (password.length < 8) {
      errors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "تکرار رمز عبور را وارد کنید.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "تکرار رمز عبور با رمز عبور یکسان نیست.";
    }

    setClientErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!validateForm(event.currentTarget)) {
      event.preventDefault();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <AuthCard>
        <div>
          <div className="mb-6 space-y-1.5">
            <h1 className="text-xl font-black tracking-tight sm:text-2xl">
              رمز عبورت را تغییر بده
            </h1>

            <p className="text-sm leading-6 text-muted-foreground">
              یک رمز عبور جدید و امن برای حساب پی‌رنگ انتخاب کنید.
            </p>
          </div>

          <form
            action={formAction}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">
                رمز عبور جدید
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
                  disabled={pending}
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
                تکرار رمز عبور جدید
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
                  placeholder="رمز عبور جدید را دوباره وارد کنید"
                  disabled={pending}
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
                  onClick={() => setShowConfirmPassword((value) => !value)}
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

            <SubmitButton pending={pending} />
          </form>
        </div>
      </AuthCard>
    </main>
  );
}
