import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSuccessCheckout } from "../../services/checkoutApi";
import toast from "react-hot-toast";

export function useUpdateCheckout() {
  const query = useQueryClient();
  const { mutate: updateCheckoutSuccess } = useMutation({
    mutationFn: updateSuccessCheckout,
    onSuccess: () => {
        toast.success('Success')
      query.invalidateQueries(["checkouts"]);
    },
  });

  return { updateCheckoutSuccess };
}
