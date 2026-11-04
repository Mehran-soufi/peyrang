import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-8 sm:py-12 overflow-x-hidden">
      <AuthCard active="login">
        <LoginForm />
      </AuthCard>
    </main>
  );
}