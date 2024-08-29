import { FC } from "react";
import SvgIcon from "../svg-icon/svg-icon.component";
import dayjs from "@/lib/dayjs";
import {
  CATEGORIES,
  CATEGORY_TYPE,
  DATE_FORMAT,
  PRIORITY_TYPE,
  TIME_FORMAT,
} from "@/helpers/constants";
import DropdownComponent from "../dropdown/dropdown.component";
import formatPriorityStyle from "@/utils/formatPriorityStyle";
import ModalComponent from "../modal/modal.component";
import useModalRef from "@/hooks/useModalRef";
import AddTask from "../add-task/add-task.component";
import useUpdateTask from "@/react-query/mutations/useUpdateTask";
import useDeleteTask from "@/react-query/mutations/useDeleteTask";

interface IProps {
  priority: PRIORITY_TYPE;
  title: string;
  description?: string;
  due_date: string;
  id: string;

  category: CATEGORY_TYPE;
}

const TaskCard: FC<IProps> = ({
  priority,
  title,
  description,
  due_date,
  id,
  category,
}) => {
  const editTaskRef = useModalRef();

  const { mutate: updateTask } = useUpdateTask(id, () => "");
  const { mutate: deleteTask } = useDeleteTask();

  const handleMoveTask = (key: CATEGORY_TYPE) => {
    updateTask({ category: key, due_date, id, priority, title, description });
  };

  return (
    <>
      <div className="w-full p-[16px] rounded-[6px] bg-white shadow-sm">
        <p
          className={`px-[8px] uppercase py-[4px] inline font-medium text-[12px] ${formatPriorityStyle(
            priority
          )}`}
        >
          {priority}
        </p>

        <div className="flex items-center justify-between gap-4">
          <p className="font-medium mt-[16px] mb-[8px] dark:text-black truncate ...">
            {title}
          </p>

          <DropdownComponent
            trigger={
              <div className="p-[4px] min-w-6 rounded-[6px] border-[1px] border-[#dddddd] shadow cursor-pointer">
                <SvgIcon width={16} height={16} iconName="more-horizontal" />
              </div>
            }
          >
            <DropdownComponent.Item onSelect={editTaskRef.open}>
              Edit
            </DropdownComponent.Item>

            <DropdownComponent.Sub trigger={<>Move to {"->"}</>}>
              {category !== "to_do" && (
                <DropdownComponent.Item
                  onSelect={() => handleMoveTask("to_do")}
                >
                  {CATEGORIES.to_do}
                </DropdownComponent.Item>
              )}

              {category !== "in_progress" && (
                <DropdownComponent.Item
                  onSelect={() => handleMoveTask("in_progress")}
                >
                  {CATEGORIES.in_progress}
                </DropdownComponent.Item>
              )}

              {category !== "completed" && (
                <DropdownComponent.Item
                  onSelect={() => handleMoveTask("completed")}
                >
                  {CATEGORIES.completed}
                </DropdownComponent.Item>
              )}
            </DropdownComponent.Sub>

            <DropdownComponent.Item danger onSelect={() => deleteTask(id)}>
              Delete
            </DropdownComponent.Item>
          </DropdownComponent>
        </div>

        {description && (
          <p className="font-regular text-[#252C32] text-[14]">{description}</p>
        )}

        <div className="mt-[16px] flex items-center justify-between font-medium text-[12px]">
          <div className="flex items-center gap-[13px]">
            <SvgIcon
              iconName={
                category === "completed"
                  ? "flag-completed"
                  : dayjs(due_date).diff(dayjs()) < 0
                  ? "flag-overdue"
                  : "flag"
              }
            />
            <p className="text-[#6E7C87]">
              {dayjs(due_date).format(DATE_FORMAT)}
            </p>
          </div>

          <p className="text-[#6F6F6F]">
            {dayjs(due_date).format(TIME_FORMAT)}
          </p>
        </div>
      </div>

      <ModalComponent trigger={<></>} title={"Edit Task"} _ref={editTaskRef}>
        <AddTask
          close={editTaskRef.close}
          edit
          values={{
            description,
            title,
            priority,
            due_date,
            id,
          }}
        />
      </ModalComponent>
    </>
  );
};

export default TaskCard;
