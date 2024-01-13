import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTour } from "../../services/toursApi";
import toast from "react-hot-toast";

export function useDeleteTour() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteTourMuatate } = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => {
      toast.success("Delete success");
      queryClient.invalidateQueries(["tours"]);
    },
  });

  return { isLoading, deleteTourMuatate };
}
