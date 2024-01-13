import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inserComment } from "../../services/commentApi";

export function useCreateComment(idTour) {

  const queryClient = useQueryClient();
  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: inserComment,
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
  });

  return { createComment, isLoading };
}
