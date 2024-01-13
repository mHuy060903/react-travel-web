import { useQuery } from "@tanstack/react-query";
import { getBookingSuccess } from "../../services/bookingApi";

export function useGetBookingSuccess(idUser) {
  const { data, isLoading } = useQuery({
    queryKey: ["bookingSuccess"],
    queryFn: () => getBookingSuccess(idUser),
  });

  return { data, isLoading };
}
