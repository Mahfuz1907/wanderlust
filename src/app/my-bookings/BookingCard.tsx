'use client'

import React from "react";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookingActionButtons from "./BookingActionButtons";

interface Booking {
  _id: string;
  destinationName: string;
  departureDate: string;
  price: number | string;
  imageUrl: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  bookingId?: string;
}

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const isConfirmed = booking.status === "Confirmed";

  return (
    <Card className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        
        {/* Left Side: Image & Info */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Destination Image */}
          <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-lg sm:h-36 sm:w-56">
            <Image
              src={`/assets/destinations/${booking.imageUrl}` || "/assets/destinations/image1.png"}
              alt={booking.destinationName}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-2">
            {/* Status Badge */}
            <div>
              <Badge
                variant="outline"
                className={`gap-1 rounded-full px-3 py-0.5 text-xs font-medium border-0 ${
                  isConfirmed
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isConfirmed ? "bg-emerald-500" : "bg-amber-500"}`} />
                {booking.status}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
              {booking.destinationName}
            </h3>

            {/* Departure & Booking ID */}
            <div className="space-y-1 text-xs text-zinc-500 sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                <span>Departure: {booking.departureDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                <span>Booking ID: {booking.bookingId || booking._id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Price & Actions */}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-4 md:flex-col md:items-end md:justify-center md:border-t-0 md:pt-0 gap-4">
          {/* Price */}
          <div className="text-2xl font-bold tracking-tight text-cyan-600 sm:text-3xl">
            ${booking.price}
          </div>

          {/* Action Buttons */}
          <BookingActionButtons booking={booking} />
        </div>

      </div>
    </Card>
  );
}