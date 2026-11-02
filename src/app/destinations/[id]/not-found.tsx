import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

export default function DestinationNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100">
          <MapPin className="h-7 w-7 text-zinc-400" aria-hidden="true" />
        </div>

        <h1 className="mt-5 text-2xl font-semibold text-zinc-900">
          Destination not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          The travel package you&apos;re looking for doesn&apos;t exist or may
          have been removed. Browse the collection to find your next adventure.
        </p>

        <Link
          href="/destinations"
          className="group mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to Destinations
        </Link>
      </div>
    </main>
  );
}
