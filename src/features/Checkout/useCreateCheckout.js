import { useMutation } from "@tanstack/react-query";
import { insertCheck } from "../../services/checkoutApi";

export function useCreateCheckout() {
  const { mutate: createCheckout, isLoading } = useMutation({
    mutationFn: insertCheck,
  });

  return { createCheckout, isLoading };
}
