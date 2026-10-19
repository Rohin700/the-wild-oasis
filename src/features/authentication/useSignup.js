import { useMutation } from "@tanstack/react-query";
import { doSignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSingup() {
  const { mutate: singUp, isPending: isSigningUp } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      doSignUp({ fullName, email, password }),

    onSuccess: (data) => {
      console.log(data);
      toast.success(`Congratulation  you have signedup successfully`);
    },

    onError: (error) => {
      toast.error("Error while signing up");
      console.log(error.message);
    },
  });
  return { singUp, isSigningUp };
}
