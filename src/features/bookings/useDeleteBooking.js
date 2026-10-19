import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: doDeleteBooking, isLoading: isDeletingBooking } = useMutation(
    {
      mutationKey: ["bookings"],
      mutationFn: (bookingId) => deleteBooking(bookingId),

      onSuccess: (data) => {
        toast.success(`Booking #${data.id} is successfully deleted`);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },

      onError: () => {
        toast.error("There is some error while deleting the booking");
      },
    },
  );
  return { doDeleteBooking, isDeletingBooking };
}
