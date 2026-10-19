import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: doLogout, isLoading } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,

    onSuccess: () => {
      queryClient.removeQueries(); // will remove all the queries from the react-query
      navigate("/login", { replace: true });
    },

    onError: (err) => {
      toast.error("Error in logging out");
      console.log(err.message);
    },
  });

  return { doLogout, isLoading };
}
