import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { getTokenFromClient } from '@/lib/getTokenFromClient';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Booking {
  _id: string;
  destinationName: string;
  departureDate: string;
  price: number | string;
  imageUrl: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  bookingId?: string;
}

const BookingDeleteDialog = ({booking}:{booking:Booking}) => {
    const [open, setOpen] = useState(false);
      const router = useRouter();
    
      const handleDelete = async() => {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/${booking._id}`, {
          method: "DELETE",
          headers: {
            "authorization": `Bearer ${token}`
          }
        });
    
        console.log("Delete response:", res);
        router.refresh()
        setOpen(false);
      };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            size='sm'
            variant="outline"
            className="h-9 gap-1.5 rounded-lg border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          />
        }
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Cancel
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="rounded-full bg-rose-50 text-rose-500">
            <Trash2 aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong className="font-semibold text-zinc-900">
              {booking.destinationName}
            </strong>
            ? This action cannot be undone. This will permanently remove the
            package and all its data from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="h-9 rounded-md border-zinc-200 bg-white px-4 text-sm text-zinc-700 hover:bg-zinc-50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="h-9 gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white hover:bg-rose-700"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete Package
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};

export default BookingDeleteDialog;