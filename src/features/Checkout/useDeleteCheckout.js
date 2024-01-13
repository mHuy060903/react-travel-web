import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCheckoutId } from "../../services/checkoutApi";

export function useDeleteCheckoutId() {
  const query = useQueryClient();
  const { mutate: deleteCheckout } = useMutation({
    mutationFn: deleteCheckoutId,
    onSuccess: () => {
      query.invalidateQueries(["checkouts"]);
    },
  });

  return { deleteCheckout };
}
