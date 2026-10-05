import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">

      <AuthCard active="login">
        <LoginForm />
      </AuthCard>
    </main>
  );
}