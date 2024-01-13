import { useMutation } from "@tanstack/react-query";
import {
  updateBookingCheckout,
  updateBookingCheckoutSuccess,
} from "../../services/bookingApi";

export function useUpdateBooking() {
  const { mutate: updateBookingCart } = useMutation({
    mutationFn: updateBookingCheckout,
  });

  return { updateBookingCart };
}

export function useUpdateBookingSuccess() {
  const { mutate: updateBookingCartSuccess } = useMutation({
    mutationFn: updateBookingCheckoutSuccess,
  });

  return { updateBookingCartSuccess };
}
