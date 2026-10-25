"use server";

import { revalidatePath } from "next/cache";

import { type UpdateProfileState } from "@/features/profile/state";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(
    _previousState: UpdateProfileState,
    formData: FormData,
): Promise<UpdateProfileState> {
    const username = String(formData.get("username") ?? "")
        .trim()
        .toLowerCase();

    const displayName = String(formData.get("displayName") ?? "").trim();
    const bio = String(formData.get("bio") ?? "").trim();
    const avatar = formData.get("avatar");

    const fieldErrors: NonNullable<
        UpdateProfileState["fieldErrors"]
    > = {};

    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
        fieldErrors.username = [
            "نام کاربری باید ۳ تا ۲۴ کاراکتر و شامل حروف انگلیسی کوچک، عدد یا _ باشد.",
        ];
    }

    if (displayName.length > 40) {
        fieldErrors.displayName = ["نام نمایشی نمی‌تواند بیشتر از ۴۰ کاراکتر باشد."];
    }

    if (bio.length > 300) {
        fieldErrors.bio = ["بیو نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد."];
    }

    let avatarFile: File | null = null;

    if (avatar instanceof File && avatar.size > 0) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(avatar.type)) {
            fieldErrors.avatar = ["فرمت تصویر باید JPG، PNG یا WebP باشد."];
        } else if (avatar.size > 1024 * 1024) {
            fieldErrors.avatar = ["حجم تصویر نباید بیشتر از ۱ مگابایت باشد."];
        } else {
            avatarFile = avatar;
        }
    }

    if (Object.keys(fieldErrors).length > 0) {
        return {
            success: false,
            message: "لطفاً اطلاعات واردشده را بررسی کنید.",
            fieldErrors,
        };
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return {
            success: false,
            message: "برای ویرایش پروفایل ابتدا وارد حساب خود شوید.",
        };
    }

    let newAvatarPath: string | null = null;
    let avatarUrl: string | null = null;

    if (avatarFile) {
        const extension =
            avatarFile.type === "image/png"
                ? "png"
                : avatarFile.type === "image/webp"
                    ? "webp"
                    : "jpg";

        newAvatarPath = `${user.id}/avatar-${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(newAvatarPath, avatarFile, {
                contentType: avatarFile.type,
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            return {
                success: false,
                message: "بارگذاری تصویر انجام نشد. لطفاً دوباره تلاش کنید.",
            };
        }

        avatarUrl = supabase.storage
            .from("avatars")
            .getPublicUrl(newAvatarPath).data.publicUrl;
    }

    const updates: {
        username: string;
        display_name: string | null;
        bio: string | null;
        avatar_url?: string;
    } = {
        username,
        display_name: displayName || null,
        bio: bio || null,
    };

    if (avatarUrl) {
        updates.avatar_url = avatarUrl;
    }

    const { error: updateError } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

    if (updateError) {
        if (newAvatarPath) {
            await supabase.storage.from("avatars").remove([newAvatarPath]);
        }
        console.error("Profile update error:", updateError);

        if (updateError.code === "23505") {
            return {
                success: false,
                message: "این نام کاربری قبلاً انتخاب شده است.",
                fieldErrors: {
                    username: ["این نام کاربری قبلاً انتخاب شده است."],
                },
            };
        }

        return {
            success: false,
            message: "ذخیرهٔ پروفایل انجام نشد. لطفاً دوباره تلاش کنید.",
        };
    }

    revalidatePath("/profile");

    return {
        success: true,
        message: "پروفایل شما با موفقیت به‌روزرسانی شد.",
    };
}
