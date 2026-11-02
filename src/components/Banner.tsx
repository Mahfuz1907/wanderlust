import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-[max(37.5rem,calc(100vh_-_5.25rem))] flex-col overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/Banner.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-[clamp(2.5rem,6.7vw,5.5rem)] font-normal leading-[1.15] text-white drop-shadow-sm">
          Discover Your
          <br />
          Next
          <br />
          Adventure
        </h1>

        <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-white/90 sm:text-[17px]">
          Explore breathtaking destinations and create unforgettable memories with{" "}
          <br className="hidden sm:inline" />
          our curated travel experiences.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-[15px] font-semibold uppercase tracking-wider text-white shadow-md shadow-black/20 transition hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-white/10 px-6 py-3 text-[15px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="z-10 border-t border-white/10 bg-black/60 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="flex-1 px-6 py-4 sm:py-6 lg:px-8"
            >
              <p className="text-[15px] font-semibold text-white">
                {field.label}
              </p>
              <p className="mt-1 text-[13px] text-neutral-400 sm:text-[14px]">
                {field.placeholder}
              </p>
            </div>
          ))}
          <button
            type="button"
            className="bg-brand px-8 py-4 text-base font-semibold text-white transition hover:bg-brand/90 sm:w-44"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
