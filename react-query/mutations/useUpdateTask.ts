import { updateTask } from "@/utils/local-storage/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "../keys";
import { CreateTaskPayload } from "./useAddTask";
import { toast } from "react-toastify";

const useUpdateTask = (id: string, close: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS],
    mutationFn: async (data: CreateTaskPayload) => {
      return updateTask(id, data);
    },
    onSuccess: () => {
      toast.success("Task updated");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TASKS] });

      setTimeout(close, 500);
    },
  });
};

export default useUpdateTask;
