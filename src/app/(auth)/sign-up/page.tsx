"use client";

import Link from "next/link";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { signUp } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

// Matches the light gray filled inputs from the design mock.
const inputClassName =
  "h-11 rounded-md border-zinc-200 bg-zinc-100 px-3.5 text-sm text-zinc-700 placeholder:text-zinc-400";

type FormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.password) {
    errors.password = "Please create a password.";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export default function SignUpPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const updateField = (field: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    // Clear the error for the field being edited.
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const { data, error } = await signUp.email({
    name: form.fullName, 
    email: form.email,
    password: form.password,
    });

    console.log("Sign-up response:", { data, error });
    router.push("/")
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-zinc-50 px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Create Account
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Start your adventure with Wanderlust
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid gap-1.5">
              <Label
                htmlFor="full-name"
                className="text-[13px] text-zinc-700"
              >
                Full Name
              </Label>
              <InputGroup className={inputClassName}>
                <InputGroupAddon>
                  <User className="text-zinc-400" aria-hidden="true" />
                </InputGroupAddon>
                <InputGroupInput
                  id="full-name"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  placeholder="Enter your name"
                  aria-invalid={Boolean(errors.fullName)}
                  className={inputClassName}
                />
              </InputGroup>
              {errors.fullName && (
                <p className="text-[13px] text-rose-500">{errors.fullName}</p>
              )}
            </div>

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
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="Create a password"
                  aria-invalid={Boolean(errors.password)}
                  className={inputClassName}
                />
              </InputGroup>
              {errors.password && (
                <p className="text-[13px] text-rose-500">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-1 h-11 w-full rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand/90"
            >
              Create Account
            </Button>
          </form>
        </div>

        {/* Footer link */}
        <p className="mt-5 text-center text-[13px] text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-brand hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
