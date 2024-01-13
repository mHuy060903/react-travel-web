import { useQuery } from "@tanstack/react-query";
import { getFourTours } from "../../services/toursApi";

export function useGetFourTour(idCur) {
  const { data: tours } = useQuery({
    queryFn: () => getFourTours(idCur),
    queryKey: ["TourLike", idCur],
  });
  return tours;
}
