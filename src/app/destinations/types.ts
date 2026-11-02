export interface Destination {
  _id: string;
  destinationName: string;
  country?: string;
  category?: string;
  price?: number | string;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
}
