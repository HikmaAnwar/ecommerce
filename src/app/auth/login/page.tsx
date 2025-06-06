"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
    } else {
      console.log("Login successful");
      router.push("/");
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}
