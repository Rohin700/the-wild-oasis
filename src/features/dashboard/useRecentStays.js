import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : searchParams.get("last");

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    data: staysAfterDate,
    isPending: isGettingStaysAfterDate,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = staysAfterDate?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return {
    confirmedStays,
    staysAfterDate,
    isGettingStaysAfterDate,
    error,
    numDays,
  };
}

export default useRecentStays;
