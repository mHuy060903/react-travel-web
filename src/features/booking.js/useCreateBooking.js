import { useMutation } from "@tanstack/react-query";
import { insertBooking } from "../../services/bookingApi";

export function useCreateBooking() {
  const {
    isLoading,
    mutate: addBooking,
    error,
  } = useMutation({
    mutationFn: insertBooking,
  });

  return { isLoading, addBooking, error };
}
