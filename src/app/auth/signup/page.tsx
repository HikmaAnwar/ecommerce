"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();

  const handleRegister = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Registration error:", error);
    } else {
      console.log("Registration successful");
      router.push("/auth/login");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
