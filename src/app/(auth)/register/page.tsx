import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-8 sm:py-12 overflow-x-hidden">
      <AuthCard active="register">
        <RegisterForm />
      </AuthCard>
    </main>
  );
}