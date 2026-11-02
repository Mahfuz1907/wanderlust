import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import { getImageSrc } from "@/lib/utils";
import BookingCard from "./booking-card";
import DeleteDestinationDialog from "./delete-destination-dialog";
import EditDestinationDialog from "./edit-destination-dialog";
import { auth } from "../../../../auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type DestinationDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DestinationDetailsPage({
  params,
}: DestinationDetailsPageProps) {
  const { id } = await params;

  const token = await getTokenFromServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/destinations/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const destination = await res.json();

  if (!destination) {
    notFound();
  }

  const imageSrc = getImageSrc(destination.imageUrl);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 sm:px-14">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-brand"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to Destinations
        </Link>

        {/* TODO: wire up delete once the admin delete endpoint exists. */}
        <div className="flex items-center gap-2">
          <EditDestinationDialog destination={destination} />
          <DeleteDestinationDialog destination={destination} />
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-zinc-100 sm:aspect-21/9">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={destination.destinationName}
            fill
            sizes="(min-width: 1280px) 77rem, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No image available
          </div>
        )}
      </div>

      {/* Details + booking card */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {destination.country && (
            <p className="flex items-center gap-1.5 text-sm text-zinc-600">
              <MapPin className="h-4 w-4 text-zinc-500" aria-hidden="true" />
              {destination.country}
            </p>
          )}

          <h1 className="mt-2 text-4xl font-medium text-zinc-900 sm:text-5xl">
            {destination.destinationName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {typeof destination.rating === "number" && (
              <span className="flex items-center gap-1.5">
                <Star
                  className="h-4 w-4 fill-green-600 text-green-600"
                  aria-hidden="true"
                />
                <span className="font-medium text-zinc-900">
                  {destination.rating}
                </span>
                {typeof destination.reviews === "number" && (
                  <span className="text-zinc-400">
                    ({destination.reviews} reviews)
                  </span>
                )}
              </span>
            )}

            {destination.duration && (
              <span className="flex items-center gap-1.5 text-zinc-700">
                <CalendarDays
                  className="h-4 w-4 text-zinc-500"
                  aria-hidden="true"
                />
                {destination.duration}
              </span>
            )}
          </div>

          {destination.description && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-zinc-900">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {destination.description}
              </p>
            </section>
          )}

          {destination.highlights && destination.highlights.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-zinc-900">
                Highlights
              </h2>
              <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {destination.highlights.map((highlight: string) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-zinc-600"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="self-start lg:sticky lg:top-8">
          <BookingCard destination={destination} />
        </aside>
      </div>
    </main>
  );
}
