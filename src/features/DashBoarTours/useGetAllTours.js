import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "../../services/toursApi";
import { useSearchParams } from "react-router-dom";

export function useGetAllTours(isHomePage = false) {
  const [searchParams] = useSearchParams();

  //filter
  const filter = searchParams.get("type")
    ? Number(searchParams.get("type"))
    : 0;

  //sortBy
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //page
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["tours", filter, sortBy, page],
    queryFn: () => getAllTours({ filter, sortBy, page, isHomePage }),
  });

  return { isLoading, data, error };
}
