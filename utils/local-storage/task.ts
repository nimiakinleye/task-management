import { CATEGORY_TYPE, PRIORITY_TYPE } from "@/helpers/constants";
import { CreateTaskPayload } from "@/react-query/mutations/useAddTask";
import { toast } from "react-toastify";

interface TasksType {
  title: string;
  description?: string;
  cover_image?: string;
  id: string;
  priority: PRIORITY_TYPE;
  due_date: string;
  category: CATEGORY_TYPE;
}

export const getTasks = () => {
  const tasks: TasksType[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
  return tasks;
};

export const addTask = (task: CreateTaskPayload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getTasks();

      const final = localStorage.setItem(
        "tasks",
        JSON.stringify([...tasks, task])
      );
      resolve(final);
    }, 1000);
  });
};

export const updateTask = (id: string, data: CreateTaskPayload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getTasks();

      const task = tasks?.find((task) => task.id === id);

      if (!task) {
        toast.error("Task not found");
        throw Error;
      }

      const new_tasks = tasks?.filter((task) => task.id !== id);

      const final = localStorage.setItem(
        "tasks",
        JSON.stringify([...new_tasks, data])
      );
      resolve(final);
    }, 1000);
  });
};

export const deleteTask = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getTasks();

      const new_tasks = tasks.filter((task) => task.id !== id);
      const final = localStorage.setItem("tasks", JSON.stringify(new_tasks));
      resolve(final);
    }, 500);
  });
};
