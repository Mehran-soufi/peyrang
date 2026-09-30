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

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("ایمیل واردشده معتبر نیست."),
  password: z
    .string()
    .min(1, "رمز عبور را وارد کنید."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;