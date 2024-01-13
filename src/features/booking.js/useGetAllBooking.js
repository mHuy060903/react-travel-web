import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../../services/bookingApi";
import { useSearchParams } from "react-router-dom";

export function useGetAllBooking() {
  const [searchParams] = useSearchParams();
  //filter
  const filter = searchParams.get("status") ? searchParams.get("status") : "";

  //sortBy
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //page
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data, isLoading } = useQuery({
    queryFn: () => getAllBooking(filter, sortBy, page),
    queryKey: ["bookings", filter, sortBy, page],
  });

  return { data, isLoading };
}
