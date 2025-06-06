"use client";

import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Button,
  Stack,
} from "@mantine/core";
import { IconMail, IconLock } from "@tabler/icons-react";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit?: (values: { email: string; password: string }) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    onSubmit?.({ email, password });
    setLoading(false);
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      className="w-full max-w-md mx-auto my-10"
    >
      <Title order={2} className="mb-6 text-center">
        {type === "login" ? "Welcome Back" : "Create an Account"}
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            leftSection={<IconMail size={16} />}
            label="Email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            leftSection={<IconLock size={16} />}
            label="Password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            error={
              password.length > 0 && password.length < 6
                ? "Password must be at least 6 characters"
                : ""
            }
          />
        </Stack>

        <Button
          type="submit"
          fullWidth
          mt="xl"
          color="orange"
          loading={loading}
          disabled={loading}
        >
          {type === "login" ? "Login" : "Sign up"}
        </Button>

        <Text size="sm" mt="md" className="text-center">
          {type === "login" ? (
            <>
              Do not have an account?{" "}
              <a href="/auth/signup" className="text-blue-500 hover:underline">
                Register
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </>
          )}
        </Text>
      </form>
    </Paper>
  );
}
