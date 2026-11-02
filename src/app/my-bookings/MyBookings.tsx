'use client'

import React from 'react';
import BookingCard from './BookingCard';

interface Booking {
  _id: string;
  destinationName: string;
  departureDate: string;
  price: number | string;
  imageUrl: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  bookingId?: string;
  userName: string;
  userEmail: string;
}

const MyBookings = ({bookings}: {bookings: Booking[]}) => {
        return (
        <div className="mx-auto max-w-5xl space-y-4">
            {bookings && bookings.length > 0 ? (
                bookings.map((booking: Booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                ))
            ) : (
                <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-zinc-500">
                    No bookings found. Start exploring travel packages!
                 </div>
            )}
        </div>
    );
};

export default MyBookings;