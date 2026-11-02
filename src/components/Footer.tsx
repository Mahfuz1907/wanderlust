import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help-center" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-24">
        {/* Brand */}
        <Image
          src="/assets/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="h-auto w-56 sm:w-[354px]"
        />
        <p className="mt-4 text-sm text-zinc-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        {/* Link columns */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Newsletter
            </h2>
            <p className="mt-4 text-sm text-zinc-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="relative mt-4">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                aria-label="Email address"
                autoComplete="email"
                className="h-14 w-full rounded-md border border-white/15 bg-white/5 pl-5 pr-12 text-sm text-white placeholder:text-zinc-500 focus:border-white/40"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 transition hover:text-white"
              >
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-col gap-6">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Support
            </h2>
            <ul className="mt-4 flex flex-col gap-6">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Contact Us
            </h2>
            <div className="mt-4 flex flex-col gap-6 text-sm text-zinc-400">
              <a href="tel:7869011522" className="transition-colors hover:text-white">
                786 901 1522
              </a>
              <a
                href="mailto:info@wanderland.com"
                className="transition-colors hover:text-white"
              >
                info@wanderland.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              aria-label="X"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
