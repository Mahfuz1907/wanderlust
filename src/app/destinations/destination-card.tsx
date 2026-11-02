import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { getImageSrc } from "@/lib/utils";
import type { Destination } from "./types";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  const imageSrc = getImageSrc(destination.imageUrl);

  return (
    <article className="group">
      {/* Cover image with rating badge */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-zinc-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={destination.destinationName}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">
            No image available
          </div>
        )}

        {typeof destination.rating === "number" && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[13px] font-semibold text-zinc-900 shadow-sm">
            {destination.rating.toFixed(1)}
            <Star
              className="h-3.5 w-3.5 fill-zinc-900 text-zinc-900"
              aria-hidden="true"
            />
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-3.5">
        {destination.country && (
          <p className="flex items-center gap-1.5 text-[13px] text-zinc-500">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {destination.country}
          </p>
        )}

        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold text-zinc-900">
            {destination.destinationName}
          </h2>
          {destination.price !== undefined && (
            <p className="shrink-0 text-base font-semibold text-zinc-900">
              ${destination.price}
              <span className="text-xs font-normal text-zinc-500">/Person</span>
            </p>
          )}
        </div>

        {destination.duration && (
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-zinc-500">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {destination.duration}
          </p>
        )}

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold tracking-wider text-brand uppercase transition-colors hover:text-brand/80"
        >
          Book Now
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
