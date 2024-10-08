import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../keys";
import { getTasks } from "@/utils/local-storage/task";
import { CATEGORIES } from "@/helpers/constants";

const useGetTasks = (filters?: Record<string, string>) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TASKS, filters],
    queryFn: () => {
      let tasks = getTasks()?.map((task) => ({
        title: task.title ?? "",
        description: task.description ?? undefined,
        priority: task.priority ?? "low",
        due_date: task.due_date,
        category: task.category,
        id: task.id,
        cover_image: task.cover_image ?? undefined,
      }));

      let { search } = filters || {};

      if (search) {
        search = search.toLowerCase();
        tasks = tasks.filter(
          (task) =>
            task.title?.toLowerCase().includes(search) ||
            task.description?.toLowerCase().includes(search) ||
            CATEGORIES[task.category]?.toLowerCase().includes(search) ||
            task.due_date?.toLowerCase().includes(search) ||
            task.priority?.includes(search)
        );
      }

      console.log("working");

      return {
        to_do: tasks.filter((task) => task.category === "to_do"),
        in_progress: tasks.filter((task) => task.category === "in_progress"),
        completed: tasks.filter((task) => task.category === "completed"),
      };
    },
  });
};

export default useGetTasks;
