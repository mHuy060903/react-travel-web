import { useQuery } from "@tanstack/react-query";
import { getTourById } from "../../services/toursApi";

export const useGetTourById = (id) => {
  const {
    isLoading,
    data: tour,
    error,
  } = useQuery({
    queryFn: () => getTourById(id),
    queryKey: ["tour", id],
  });

  return { tour, error, isLoading };
};
