import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin edited succesfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (error) => toast.error(error.message),
  });

  return { isEditing, editCabin };
}
