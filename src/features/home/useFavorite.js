import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteTour } from "../../services/usersApi";
import toast from "react-hot-toast";

export function useFavorite() {
  const queryClient = useQueryClient();
  const { mutate: favorite } = useMutation({
    mutationFn: favoriteTour,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", "favorites"]);

      toast.success("Success");
    },
  });

  return { favorite };
}
