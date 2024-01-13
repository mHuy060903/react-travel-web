import { useQuery } from "@tanstack/react-query";
import { getAllFavorite } from "../../services/usersApi";
export function useGetFavorite(tourFavorite) {
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getAllFavorite(tourFavorite),
  });

  return { data, isLoading };
}
