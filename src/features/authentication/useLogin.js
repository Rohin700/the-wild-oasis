import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //in react5 isPending is used instead of isLoading
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => doLogin({ email, password }),

    onSuccess: (data) => {
      //regex exp of "@gmail.com" is
      const name = data.user.email.replace(/@.*/, "");
      toast.success(`Welcome ${name}`);
      console.log(data);

      queryClient.setQueryData(["user"], data.user);
      console.log("Navigating to dashboard");
      navigate("/dashboard", { replace: true });
    },

    //this will have the have sent by throw new Error from doLogin;
    onError: (err) => {
      console.error("Error", err.message);
      toast.error("Kindly check the email and password again");
    },
  });

  return { login, isLoading };
}
