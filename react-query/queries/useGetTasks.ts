import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../keys";
import { getTasks } from "@/utils/local-storage/task";

const useGetTasks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TASKS],
    queryFn: () => {
      const tasks = getTasks()?.map((task) => ({
        title: task.title ?? "",
        description: task.description ?? undefined,
        priority: task.priority ?? "low",
        due_date: task.due_date,
        category: task.category,
        id: task.id,
        cover_image: task.cover_image ?? undefined,
      }));

      return {
        to_do: tasks.filter((task) => task.category === "to_do"),
        in_progress: tasks.filter((task) => task.category === "in_progress"),
        completed: tasks.filter((task) => task.category === "completed"),
      };
    },
  });
};

export default useGetTasks;
