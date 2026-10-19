import { useQuery } from "@tanstack/react-query";
import { getCurrUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrUser,
  });

  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
  };
}
