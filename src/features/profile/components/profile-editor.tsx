"use client";

import { useActionState, useEffect, useState } from "react";
import { Camera, LoaderCircle, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateProfile } from "@/features/profile/actions/update-profile";
import { initialUpdateProfileState } from "@/features/profile/state";

type ProfileEditorProps = {
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string;
  email: string;
  createdAt: string;
};

export function ProfileEditor({
  username,
  displayName,
  avatarUrl,
  bio,
  email,
  createdAt,
}: ProfileEditorProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialUpdateProfileState,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      setIsEditing(false);
      setSelectedFile(null);
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleAvatarChange(file: File | undefined) {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("فرمت تصویر باید JPG، PNG یا WebP باشد.");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("حجم تصویر نباید بیشتر از ۱ مگابایت باشد.");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function cancelEditing() {
    setIsEditing(false);
    setSelectedFile(null);
    setPreview(avatarUrl);
  }

  return (
    <section className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold">اطلاعات حساب</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            اطلاعات عمومی پروفایل خود را مدیریت کنید.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <Pencil className="size-4" />
            ویرایش پروفایل
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">ایمیل حساب</p>
          <p className="mt-1 break-all text-sm font-medium" dir="ltr">
            {email}
          </p>
        </div>

        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">تاریخ عضویت</p>
          <p className="mt-1 text-sm font-medium">
            {new Date(createdAt).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>

      {isEditing && (
        <form action={formAction} className="mt-6 space-y-5">
          <div className="flex flex-col items-start gap-3">
            <span className="text-sm font-semibold">تصویر پروفایل</span>

            <div className="flex items-center gap-4">
              <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-muted">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="پیش‌نمایش تصویر پروفایل"
                    className="size-full object-cover"
                  />
                ) : (
                  <Camera className="size-8 text-muted-foreground" />
                )}
              </div>

              <label className="inline-flex h-10 cursor-pointer items-center rounded-xl border px-3 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">
                انتخاب تصویر
                <input
                  type="file"
                  name="avatar"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  disabled={pending}
                  onChange={(event) =>
                    handleAvatarChange(event.target.files?.[0])
                  }
                />
              </label>

              <p className="text-xs leading-5 text-muted-foreground">
                JPG، PNG یا WebP؛ حداکثر ۱ مگابایت
              </p>
            </div>

            {selectedFile && (
              <p className="text-xs text-muted-foreground">
                تصویر انتخاب‌شده: {selectedFile.name}
              </p>
            )}

            {state.fieldErrors?.avatar?.map((error) => (
              <p key={error} className="text-xs text-destructive">
                {error}
              </p>
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-semibold">
              نام کاربری
            </label>
            <input
              id="username"
              name="username"
              defaultValue={username}
              required
              minLength={3}
              maxLength={24}
              autoComplete="username"
              dir="ltr"
              placeholder="mehran_soufi"
              disabled={pending}
              className="h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-left text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
            />
            <p className="text-xs leading-5 text-muted-foreground">
              فقط حروف انگلیسی کوچک، عدد و زیرخط؛ ۳ تا ۲۴ کاراکتر.
            </p>
            {state.fieldErrors?.username?.map((error) => (
              <p key={error} className="text-xs text-destructive">
                {error}
              </p>
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="displayName" className="text-sm font-semibold">
              نام نمایشی
            </label>
            <input
              id="displayName"
              name="displayName"
              defaultValue={displayName}
              maxLength={40}
              disabled={pending}
              placeholder="نامی که دیگران می‌بینند"
              className="h-11 w-full rounded-xl border border-border/70 bg-background px-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
            />
            {state.fieldErrors?.displayName?.map((error) => (
              <p key={error} className="text-xs text-destructive">
                {error}
              </p>
            ))}
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-semibold">
              دربارهٔ من
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={bio}
              maxLength={300}
              rows={4}
              disabled={pending}
              placeholder="کمی دربارهٔ خودت و علاقه‌ات به کتاب بنویس..."
              className="w-full resize-y rounded-xl border border-border/70 bg-background px-3 py-2.5 text-sm leading-7 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
            />
            <p className="text-xs text-muted-foreground">حداکثر ۳۰۰ کاراکتر</p>
            {state.fieldErrors?.bio?.map((error) => (
              <p key={error} className="text-xs text-destructive">
                {error}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 border-t pt-4">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending && <LoaderCircle className="size-4 animate-spin" />}
              {pending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>

            <button
              type="button"
              onClick={cancelEditing}
              disabled={pending}
              className="inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60"
            >
              <X className="size-4" />
              انصراف
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
