import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId], //1.
    queryFn: () => getBooking(bookingId),
    retry: false, //2.
  });

  return { isLoading, booking, error };
}

/*
    1.
    it will act as the dependency array i.e. if the vakue of the bookingId
    changes than it will re render the component where it is used

    2.
    we know that react or the tanStack query if fails to fetch the data tries 
    three times so by retry: false we stopped its default nature bcz if 
    it didn't get in once it means data corresponding to this id is not present
*/
