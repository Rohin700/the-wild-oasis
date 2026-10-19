import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/globalConstants";

export function useBookings() {
  console.time("BookingTable");

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const queryClient = useQueryClient();

  //1. Filter
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : [
          { field: "status", value: filterValue },
          { field: "totalPrice", value: 5000, method: "gte" },
        ];
  // : { field: "totalPrice", value: 7000, method: "gte" };

  //2. SortBy
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //3. Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //4. PreFetching
  const pageCount = Math.ceil((data?.count ?? 0) / PAGE_SIZE);

  console.log(
    "page: ",
    page,
    "pageCount: ",
    pageCount,
    "ttlCount: ",
    data?.count,
  );

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  console.timeEnd("BookingTable");
  return {
    isLoading,
    bookings: data?.data ?? [],
    count: data?.count ?? 0,
    error,
  };
}
