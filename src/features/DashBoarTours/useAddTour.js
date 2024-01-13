import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTour } from "../../services/toursApi";
import { toast } from "react-hot-toast";
export function useAddTour() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: addTour } = useMutation({
    mutationFn: createTour,
    onSuccess: () => {
      toast.success("Create success");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
    onError: (error) => toast.error(error),
  });

  return { isLoading, addTour };
}
