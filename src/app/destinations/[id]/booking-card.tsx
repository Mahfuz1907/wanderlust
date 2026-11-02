'use client'

import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Destination } from "../types";
import { useSession } from "@/app/lib/auth-client";

// Standard perks shown on every booking card.
const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

type BookingCardProps = {
  destination: Destination;
};

export default function BookingCard({ destination }: BookingCardProps) {
  const {data:session} = useSession()
  const user = session?.user
  
  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const departureDate = formData.get("departureDate") as string;

    const data = {
      userEmail: user?.email,
      destinationName: destination.destinationName,
      price: destination.price,
      imageUrl: destination.imageUrl,
      departureDate: departureDate,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("Booking response:", result);
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-[13px] text-zinc-500">Starting from</p>
      {destination.price !== undefined && (
        <>
          <p className="mt-1 text-3xl font-semibold text-brand">
            ${destination.price}
          </p>
          <p className="mt-0.5 text-[13px] text-zinc-500">per person</p>
        </>
      )}

      <form onSubmit={(event) => {handleBooking(event)}}>
      <Input
        name="departureDate"
        type="date"
        defaultValue={destination.departureDate}
        aria-label="Departure date"
        className="mt-5 h-11 w-full rounded-md border-zinc-200 bg-zinc-100 px-3.5 text-sm text-zinc-700"
      />

      {/* TODO: create the booking for the signed-in user once the bookings API exists. */}
      <Button
        type="submit"
        className="mt-3 h-11 w-full gap-2 rounded-md bg-brand text-sm font-semibold text-white hover:bg-brand/90"
      >
        Book Now
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
      </form>

      <ul className="mt-5 space-y-2.5 border-t border-zinc-200 pt-5">
        {bookingPerks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-[13px] text-zinc-600"
          >
            <Check
              className="h-4 w-4 shrink-0 text-green-600"
              aria-hidden="true"
            />
            {perk}
          </li>
        ))}
      </ul>
    </section>
  );
}
