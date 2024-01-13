import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/bookingApi";

export function useDeleteBooking() {
  const query = useQueryClient();
  const { mutate: deleteBookingId, isLoading } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: () => {
      query.invalidateQueries(["booking"]);
    },
  });

  return { deleteBookingId, isLoading };
}
