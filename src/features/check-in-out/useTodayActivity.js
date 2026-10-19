import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: activities, isPending: isLoading } = useQuery({
    queryKey: ["today-Activity"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoading };
}

export { useTodayActivity };
