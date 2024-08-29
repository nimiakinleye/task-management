import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "../keys";
import { deleteTask } from "@/utils/local-storage/task";
import { toast } from "react-toastify";

const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_TASK],
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TASKS] });
    },
  });
};

export default useDeleteTask;
