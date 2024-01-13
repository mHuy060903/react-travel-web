import { useQuery } from "@tanstack/react-query";
import { getAllBookingInCart } from "../../services/bookingApi";

export const useGetBookingInCart = (userId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getAllBookingInCart(userId),
  });

  return { data, isLoading };
};
