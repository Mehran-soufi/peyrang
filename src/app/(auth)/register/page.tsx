import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">

      <AuthCard active="register">
        <RegisterForm />
      </AuthCard>
    </main>
  );
}