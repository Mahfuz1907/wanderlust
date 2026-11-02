import type { Destination } from "./types";

export async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/destinations`,
    );

    if (!res.ok) {
      throw new Error(`Destinations API responded with ${res.status}`);
    }

    const data: unknown = await res.json();
    return Array.isArray(data) ? (data as Destination[]) : [];
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return [];
  }
}
