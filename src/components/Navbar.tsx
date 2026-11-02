import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavbarAuth from "./NavbarAuth";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "Add Destinations", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
  { label: "Admin", href: "/admin", active: false },
];

export default function Navbar() {
  return (
    <header className="bg-background">
      {/* Top brand accent strip */}
      <div className="h-1 bg-brand" />

      <nav
        aria-label="Main navigation"
        className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 lg:px-10"
      >
        {/* Left: primary links */}
        <ul className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-brand",
                  link.active
                    ? "font-medium text-brand"
                    : "text-zinc-700",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center: logo */}
        <Link href="/" className="justify-self-center">
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-6 w-auto"
          />
        </Link>

        {/* Right: auth links (login/sign up) or profile + sign out */}
        <ul className="flex items-center justify-end gap-5 sm:gap-6">
          <NavbarAuth />
        </ul>
      </nav>
    </header>
  );
}
