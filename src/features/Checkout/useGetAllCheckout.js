import { useQuery } from "@tanstack/react-query";
import { readAllCheckout } from "../../services/checkoutApi";

export function useGetAllCheckout() {
  const { data, isLoading } = useQuery({
    queryFn: readAllCheckout,
    queryKey: ["checkouts"],
  });
  return { data, isLoading };
}
