import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100">
          <Compass className="h-7 w-7 text-zinc-400" aria-hidden="true" />
        </div>

        <p className="mt-5 text-sm font-semibold tracking-widest text-brand uppercase">
          404 Error
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="group mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
