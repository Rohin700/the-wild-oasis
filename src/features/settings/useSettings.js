import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    error,
    isLoading: isLoadingSettings,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings, //getsettings has to be an asynchronous func
  });

  return { settings, error, isLoadingSettings };
}
