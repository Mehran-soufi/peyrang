import { z } from "zod";

export const registerSchema = z
    .object({
        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("ایمیل واردشده معتبر نیست."),
        password: z
            .string()
            .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),
        confirmPassword: z
            .string()
            .min(1, "تکرار رمز عبور را وارد کنید."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "رمزهای عبور با یکدیگر مطابقت ندارند.",
        path: ["confirmPassword"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;