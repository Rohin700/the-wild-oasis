import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doUpdateCurrUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationKey: ["user"],
    /* 
     without this we have to add queryClient.setQueryData({"user", data.user})
     in onSuccess to make refetch, here we are doing it using invalidateQueries as we provided mutateKey
     */
    mutationFn: ({ password, fullName, avatar }) =>
      doUpdateCurrUser({ password, fullName, avatar }),

    onSuccess: () => {
      toast.success("Successfully updated the user info");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      toast.error("Error while updating the user sorrryy", error.message);
      console.error(error.message);
    },
  });

  return { updateUser, isUpdatingUser };
}
