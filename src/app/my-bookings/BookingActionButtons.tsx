import BookingDeleteDialog from './BookingDeleteDialog';

interface Booking {
  _id: string;
  destinationName: string;
  departureDate: string;
  price: number | string;
  imageUrl: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  bookingId?: string;
}

const BookingActionButtons = ({booking}: {booking: Booking}) => {
    return (
        <div className="flex items-center gap-2">
          <BookingDeleteDialog booking={booking} />
        </div>
    );
};

export default BookingActionButtons;