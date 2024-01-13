import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../services/authApi";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: signin,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Login success");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provider email or password are incorrect");
    },
  });

  return { login, isLoading };
}
