import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-zinc-900 py-16 lg:py-24">
      {/* Full-bleed image band */}
      <div className="relative overflow-hidden">
        <Image
          src="/assets/CTA.png"
          alt=""
          width={1440}
          height={440}
          className="h-auto w-full"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      </div>

      <div className="mx-auto mt-5 max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-medium text-white sm:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-zinc-300 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-900 transition hover:bg-zinc-100"
          >
            Book Your Trip Today
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
