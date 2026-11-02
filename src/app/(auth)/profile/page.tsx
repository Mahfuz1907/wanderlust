"use client";

import { 
  MapPin,  
  Globe, 
  DollarSign, 
  Plane, 
  TrendingUp, 
  Edit3, 
  Mail, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/app/lib/auth-client";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  location: string;
  nationality: string;
  memberSince: string;
  totalBookings: number;
  countriesVisited: number;
  upcomingTrips: number;
  totalSpent: number | string;
}

const ProfilePage = () => {
    const {data} = useSession()
    const user: UserProfile = {
    name: data?.user?.name || "N/A",
    email: data?.user?.email || "N/A",
    location:  "N/A",
    nationality: "N/A",
    memberSince: data?.user?.createdAt ? new Date(data.user.createdAt).toLocaleDateString(): "N/A",
    totalBookings: 0,
    countriesVisited: 0,
    upcomingTrips: 0,
    totalSpent: 0,
  }

    return (
        <main className="min-h-screen bg-zinc-50/50 px-6 py-12 sm:px-14 sm:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-zinc-500 sm:text-base">
          Manage your account settings and travel preferences
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column: User Info Card (No Image, using Initials Avatar) */}
        <Card className="rounded-2xl border-zinc-200/85 bg-white shadow-sm transition-all hover:shadow-md lg:col-span-1">
          <CardContent className="flex flex-col items-center p-6 text-center sm:p-8">
            
            {/* Avatar with Initials instead of real image */}
            <div className="relative mb-4">
              <Avatar className="h-28 w-28 border-4 border-zinc-100 shadow-inner">
                <AvatarFallback className="bg-linear-to-tr from-cyan-600 to-teal-500 text-3xl font-bold text-white">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'N/A'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white shadow-md">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>

            {/* Name & Location */}
            <h2 className="text-xl font-bold text-zinc-900">{user?.name}</h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
              <MapPin className="h-3.5 w-3.5 text-zinc-400" />
              <span>{user?.location || 'Location not specified'}</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
              <Mail className="h-3.5 w-3.5" />
              <span>{user?.email}</span>
            </div>

            <Separator className="my-6 w-full bg-zinc-100" />

            {/* Details List */}
            <div className="w-full space-y-3 text-left text-sm">
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2">
                <span className="text-zinc-500">Member Since</span>
                <span className="font-medium text-zinc-800">{user?.memberSince || 'Not specified'}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2">
                <span className="text-zinc-500">Nationality</span>
                <span className="font-medium text-zinc-800">{user?.nationality || 'Not specified'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex w-full flex-col gap-3">
              <Link href="/profile/edit">
              <Button className="w-full gap-2 rounded-xl bg-teal-600 text-white shadow-sm hover:bg-teal-700">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
              </Link>
            </div>

          </CardContent>
        </Card>

        {/* Right Column: Travel Statistics */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900">Travel Statistics</h3>
            <p className="text-sm text-zinc-500">Overview of your journeys and milestones around the globe</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            
            {/* Stat Card 1: Total Bookings */}
            <Card className="rounded-2xl border-zinc-200/85 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Total Bookings</p>
                  <h4 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{user?.totalBookings || 0}</h4>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <Plane className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-teal-600 font-medium">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-600"></span>
                Active traveler account
              </div>
            </Card>

            {/* Stat Card 2: Countries Visited */}
            <Card className="rounded-2xl border-zinc-200/85 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Countries Visited</p>
                  <h4 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{user?.countriesVisited || 0}</h4>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Globe className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <span>Top 10% global explorer</span>
              </div>
            </Card>

            {/* Stat Card 3: Upcoming Trips */}
            <Card className="rounded-2xl border-zinc-200/85 bg-white p-6 shadow-sm transition-all hover:border-amber-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Upcoming Trips</p>
                  <h4 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{user?.upcomingTrips || 0}</h4>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-amber-600 font-medium">
                Next trip in 2 weeks
              </div>
            </Card>

            {/* Stat Card 4: Total Spent */}
            <Card className="rounded-2xl border-zinc-200/85 bg-white p-6 shadow-sm transition-all hover:border-fuchsia-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Total Spent</p>
                  <h4 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{user?.totalSpent || 0}</h4>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-50 text-fuchsia-600">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-fuchsia-600 font-medium">
                Lifetime package investments
              </div>
            </Card>

          </div>
        </div>

      </div>
    </main>
    );
};

export default ProfilePage;