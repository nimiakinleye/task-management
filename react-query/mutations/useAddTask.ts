import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "../keys";
import { CATEGORY_TYPE, PRIORITY_TYPE } from "@/helpers/constants";
import { toast } from "react-toastify";
import { addTask } from "@/utils/local-storage/task";

export interface CreateTaskPayload {
  title: string;
  description?: string;
  id: string;
  priority: PRIORITY_TYPE;
  due_date: string;
  category: CATEGORY_TYPE;
}

const useAddTask = (close: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_TASK],
    mutationFn: async (data: CreateTaskPayload) => {
      return addTask(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TASKS] });
      toast.success("Task created successfully");
      setTimeout(close, 500);
    },
  });
};

export default useAddTask;
