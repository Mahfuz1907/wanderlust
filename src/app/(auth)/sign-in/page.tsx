"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { signIn } from "@/app/lib/auth-client";

// Matches the light gray filled inputs from the design mock.
const inputClassName =
  "h-11 rounded-md border-zinc-200 bg-zinc-100 px-3.5 text-sm text-zinc-700 placeholder:text-zinc-400";

type FormState = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type FormErrors = Partial<Record<"email" | "password", string>>;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
}

export default function SignInPage() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const updateField = (field: "email" | "password", value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    // Clear the error for the field being edited.
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setApiError(null);

    const { data, error } = await signIn.email({
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe,
    });

    console.log("Sign-in response:", { data, error });

    router.push("/");
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-zinc-50 px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-900">Welcome Back</h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Resume your adventure with Wanderlust
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-[13px] text-zinc-700">
                Email Address
              </Label>
              <InputGroup className={inputClassName}>
                <InputGroupAddon>
                  <Mail className="text-zinc-400" aria-hidden="true" />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Enter your email"
                  aria-invalid={Boolean(errors.email)}
                  className={inputClassName}
                />
              </InputGroup>
              {errors.email && (
                <p className="text-[13px] text-rose-500">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-[13px] text-zinc-700">
                Password
              </Label>
              <InputGroup className={inputClassName}>
                <InputGroupAddon>
                  <Lock className="text-zinc-400" aria-hidden="true" />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  className={inputClassName}
                />
              </InputGroup>
              {errors.password && (
                <p className="text-[13px] text-rose-500">{errors.password}</p>
              )}
            </div>

            {/* Remember me + forgot password */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="remember-me"
                className="flex cursor-pointer items-center gap-2 text-[13px] text-zinc-600 select-none"
              >
                <Checkbox
                  id="remember-me"
                  checked={form.rememberMe}
                  onCheckedChange={(checked) =>
                    setForm((previous) => ({
                      ...previous,
                      rememberMe: checked === true,
                    }))
                  }
                />
                Remember me
              </label>
              {/* TODO: add a forgot-password route once the backend supports it. */}
              <Link
                href="/forgot-password"
                className="text-[13px] font-medium text-brand hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {apiError && (
              <p className="rounded-md bg-rose-50 px-3 py-2 text-[13px] text-rose-600">
                {apiError}
              </p>
            )}

            <Button
              type="submit"
              className="mt-1 h-11 w-full rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand/90"
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer link */}
        <p className="mt-5 text-center text-[13px] text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-brand hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
