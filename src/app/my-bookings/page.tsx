import React from 'react';
import MyBookings from './MyBookings';
import { headers } from 'next/headers';
import { auth } from '../../../auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
    headers: await headers()
    })
    const userEmail = session?.user?.email;
    const token = await getTokenFromServer();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/${userEmail}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
    const bookings = await res.json();
   
    return (
        <main className="min-h-screen bg-zinc-50/50 px-6 py-12 sm:px-14 sm:py-16">
            {/* Page Title */}
            <div className="mb-10">
                <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                    My Bookings
                </h1>
                <p className="mt-2 text-sm text-zinc-500 sm:text-base">
                    Manage and view your upcoming travel plans
                </p>
            </div>

            <MyBookings bookings={bookings} />
        </main>
    );
};

export default MyBookingsPage;