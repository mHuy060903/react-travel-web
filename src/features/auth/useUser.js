import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/authApi";

function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { data, isLoading };
}

export default useUser;
