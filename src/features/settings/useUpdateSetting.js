import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: doUpdateSetting, isLoading: isUpdatingSetting } = useMutation(
    {
      mutationFn: (newSettings) => updateSetting(newSettings),
      onSuccess: () => {
        toast.success("Setting updated successfully");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (err) => toast.error(err.message),
    },
  );

  return { doUpdateSetting, isUpdatingSetting };
}
