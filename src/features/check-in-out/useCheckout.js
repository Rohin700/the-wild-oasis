import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has successfully check-out `);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("Unable to check-out");
    },
  });

  return { checkOut, isCheckingOut };
}
