import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCommentTour } from "../../services/commentApi";

export function useGetAllComment(tourId) {
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", sortBy, tourId],
    queryFn: () => getCommentTour(tourId, sortBy),
  });

  return { isLoading, data, error };
}
