import { useMutation } from "@tanstack/react-query";
import { singup as signupApi } from "../../services/authApi";
import { toast } from "react-hot-toast";

export function useSingup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        `Account successfully created! Please verufy the new account from the user's email address `
      );
    },
  });
  return { signup, isLoading };
}
