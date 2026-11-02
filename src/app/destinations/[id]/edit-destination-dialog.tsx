"use client";

import { useState } from "react";
import { Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { Destination } from "../types";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

// Common package categories. The current value is always merged in so a
// destination with an unusual category still shows it in the select.
const categoryOptions = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

// Matches the light bordered inputs used across the destination pages.
const fieldClassName =
  "h-11 w-full rounded-md border-zinc-200 bg-white px-3.5 text-sm text-zinc-700 placeholder:text-zinc-400";

type FormState = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

function toFormState(destination: Destination): FormState {
  return {
    destinationName: destination.destinationName,
    country: destination.country ?? "",
    category: destination.category ?? "",
    price: destination.price !== undefined ? String(destination.price) : "",
    duration: destination.duration ?? "",
    // <input type="date"> only accepts a plain yyyy-mm-dd value.
    departureDate: destination.departureDate?.slice(0, 10) ?? "",
    imageUrl: destination.imageUrl ?? "",
    description: destination.description ?? "",
  };
}

type EditDestinationDialogProps = {
  destination: Destination;
};

export default function EditDestinationDialog({
  destination,
}: EditDestinationDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => toFormState(destination));
  const router = useRouter()

  const categories = categoryOptions.includes(form.category)
    ? categoryOptions
    : [form.category, ...categoryOptions].filter(Boolean);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await getTokenFromClient()
    
    const res = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/destinations/${destination._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(form),
    });
    console.log("Update response:", res);

    router.refresh();
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-10 gap-2 rounded-md border-zinc-200 bg-white px-4 text-sm text-zinc-700 hover:bg-zinc-50"
      >
        <Pencil className="h-4 w-4" aria-hidden="true" />
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Travel Package</DialogTitle>
            <DialogDescription>
              Make changes to the travel package details below
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="destination-name">Name</Label>
              <Input
                id="destination-name"
                value={form.destinationName}
                onChange={(event) =>
                  updateField("destinationName", event.target.value)
                }
                disabled
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(event) =>
                    updateField("country", event.target.value)
                  }
                  placeholder="Indonesia"
                  className={fieldClassName}
                />
              </div>

              <div className="grid gap-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category || null}
                  onValueChange={(value) =>
                    updateField("category", value ?? "")
                  }
                >
                  <SelectTrigger className={fieldClassName}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  placeholder="e.g., 1299"
                  className={fieldClassName}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={form.duration}
                  onChange={(event) =>
                    updateField("duration", event.target.value)
                  }
                  placeholder="e.g., 7 Days/6 Nights"
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="departure-date">Departure Date</Label>
              <Input
                id="departure-date"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  updateField("departureDate", event.target.value)
                }
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="text"
                value={form.imageUrl}
                onChange={(event) =>
                  updateField("imageUrl", event.target.value)
                }
                placeholder="https://example.com/image.jpg"
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Describe the travel experience..."
                className="min-h-24 rounded-md border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>

            <div className="mt-1 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-10 rounded-md border-zinc-200 bg-white px-4 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white hover:bg-brand/90"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
