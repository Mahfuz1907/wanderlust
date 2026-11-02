"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "@/app/lib/auth-client";

export default function NavbarAuth() {
  const { data, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in')
  };

  if (isPending) {
    return (
      <li aria-hidden="true" className="flex items-center gap-5 sm:gap-6">
        <span className="size-8 animate-pulse rounded-full bg-zinc-100" />
        <span className="h-4 w-16 animate-pulse rounded bg-zinc-100" />
      </li>
    );
  }

  if (!data?.user) {
    return (
      <>
        <li>
          <Link
            href="/sign-in"
            className="text-sm text-zinc-700 transition-colors hover:text-brand"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/sign-up"
            className="text-sm text-zinc-700 transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link
          href="/profile"
          aria-label="Profile"
          title={data.user.name}
          className="flex size-8 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors hover:border-brand/40 hover:text-brand"
        >
          <User className="h-4 w-4" aria-hidden="true" />
        </Link>
      </li>
      <li>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-sm text-zinc-700 transition-colors hover:text-rose-500"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Sign Out
        </button>
      </li>
    </>
  );
}
