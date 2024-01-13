import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllUser } from "../../services/usersApi";

export function useUsers() {
  //   const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //search
  const searchValue = searchParams.get("email");

  //sortBy
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //page
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["users", searchValue, sortBy, page],
    queryFn: () => getAllUser({ searchValue, sortBy, page }),
  });

  return { isLoading, data, error };
}
