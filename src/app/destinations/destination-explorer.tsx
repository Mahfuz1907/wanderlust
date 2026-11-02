"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DestinationCard from "./destination-card";
import type { Destination } from "./types";
import { DestinationsType } from "../../../types";

const priceRanges = [
  { value: "under-1000", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1000-2000", label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { value: "2000-3000", label: "$2,000 - $3,000", min: 2000, max: 3000 },
  { value: "3000-plus", label: "$3,000 & above", min: 3000, max: Infinity },
];

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

// Matches the light bordered filter boxes from the design mock.
const filterTriggerClassName =
  "h-11 w-full justify-between rounded-md border-zinc-200 bg-white px-4 text-[12px] font-medium tracking-wider text-zinc-500 uppercase transition-colors hover:border-zinc-300";

const toPrice = (price: Destination["price"]) => Number(price) || 0;


export default function DestinationExplorer({
  destinations,
}: {destinations: DestinationsType[]}) {
  // `null` = nothing selected yet, so the uppercase label acts as placeholder.
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  // Category options are derived from whatever the API returned.
  const categories = Array.from(
    new Set(
      destinations
        .map((destination) => destination.category)
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const activeRange = priceRanges.find((range) => range.value === priceRange);

  const visibleDestinations = destinations.filter((destination) => {
    if (category && destination.category !== category) return false;
    if (activeRange) {
      const price = toPrice(destination.price);
      if (price < activeRange.min || price >= activeRange.max) return false;
    }
    return true;
  });

  const sortedDestinations = [...visibleDestinations].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return toPrice(a.price) - toPrice(b.price);
      case "price-desc":
        return toPrice(b.price) - toPrice(a.price);
      case "name-asc":
        return a.destinationName.localeCompare(b.destinationName);
      default:
        return 0;
    }
  });

  return (
    <>
      {/* Filters */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className={filterTriggerClassName}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)}
        >
          <SelectTrigger className={filterTriggerClassName}>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className={filterTriggerClassName}>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Result count */}
      <p className="mt-4 text-[13px] text-zinc-500">
        Showing {sortedDestinations.length} destination
        {sortedDestinations.length === 1 ? "" : "s"}
      </p>

      {/* Grid / empty states */}
      {destinations.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <MapPin className="h-10 w-10 text-zinc-300" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-zinc-900">
            No destinations yet
          </h2>
          <p className="text-sm text-zinc-500">
            Travel packages added to the collection will appear here.
          </p>
        </div>
      ) : sortedDestinations.length === 0 ? (
        <div className="mt-16 text-center text-sm text-zinc-500">
          No destinations match your filters. Try adjusting your selection.
        </div>
      ) : (
        <div className="mt-6 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {sortedDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      )}
    </>
  );
}
