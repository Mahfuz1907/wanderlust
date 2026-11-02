"use client";

import { useState, type FormEvent } from "react";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

const initialForm = {
  destinationName: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type FormState = typeof initialForm;

// Shared light-field styling: matches the mock's filled inputs while keeping
// the shadcn primitives (dark-mode overrides are intentionally skipped —
// this page is light-styled like the other cloned sections).
const fieldClassName =
  "h-10 rounded-md border-zinc-200 bg-zinc-50 px-3.5 placeholder:text-zinc-400";

const labelClassName = "text-[13px] text-zinc-900";

export default function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(initialForm);

  const setField = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await getTokenFromClient()
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form),
    })

    const destinationData = await res.json();
    console.log("Response from backend:", destinationData);
  };

  const handleCancel = () => {
    setForm(initialForm);
  };

  return (
    <main className="px-6 py-12 sm:px-14 sm:py-16">
      <h1 className="text-4xl font-medium text-zinc-900 sm:text-5xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-10 max-w-3xl rounded-xl p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="destinationName" className={labelClassName}>
              Destination Name
            </Label>
            <Input
              id="destinationName"
              name="destinationName"
              value={form.destinationName}
              onChange={(e) => setField("destinationName", e.target.value)}
              placeholder="Bali Paradise"
              className={fieldClassName}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country" className={labelClassName}>
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={form.country}
                onChange={(e) => setField("country", e.target.value)}
                placeholder="Indonesia"
                className={fieldClassName}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className={labelClassName}>
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(value) => {
                  // Base UI emits `null` when the selection is cleared.
                  if (value !== null) setField("category", value);
                }}
              >
                <SelectTrigger
                  id="category"
                  className={`w-full ${fieldClassName}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className={labelClassName}>
                Price (USD)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                placeholder="e.g., 1299"
                className={fieldClassName}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className={labelClassName}>
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
                placeholder="e.g., 7 Days/6 Nights"
                className={fieldClassName}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureDate" className={labelClassName}>
              Departure Date
            </Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              value={form.departureDate}
              onChange={(e) => setField("departureDate", e.target.value)}
              className={fieldClassName}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className={labelClassName}>
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={form.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={fieldClassName}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={labelClassName}>
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe the travel experience..."
              className="min-h-40 resize-y rounded-md border-zinc-200 bg-zinc-50 px-3.5 py-3 placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="h-10 gap-2 rounded-md border-rose-200 bg-white px-4 text-sm text-rose-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 gap-2 rounded-md bg-brand px-4 text-sm text-white hover:bg-brand/90"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
