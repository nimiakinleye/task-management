import { CATEGORIES, CATEGORY_TYPE, PRIORITY_TYPE } from "@/helpers/constants";
import { FC } from "react";
import ModalComponent from "../modal/modal.component";
import useModalRef from "@/hooks/useModalRef";
import TaskCard from "../task-card/task-card.component";
import AddTask from "../add-task/add-task.component";
import SvgIcon from "../svg-icon/svg-icon.component";

interface ITask {
  priority: PRIORITY_TYPE;
  title: string;
  description?: string;
  due_date: string;
  id: string;
}

interface IProps {
  category: CATEGORY_TYPE;
  tasks: ITask[];
}

const CategoryComponent: FC<IProps> = ({ category, tasks }) => {
  const addTaskRef = useModalRef();

  return (
    <div
      style={{ width: "min(352px, 100%)" }}
      className="bg-[#F5F7F9] dark:bg-gray-700 px-[8px] py-[12px] h-fit rounded-[8px] flex flex-col gap-2"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-[16px] text-[#6F6F6F] dark:text-white">
            {CATEGORIES[category]}
          </h1>

          <div className="text-[#6F6F6F] font-medium text-[14px] flex justify-center rounded-[4px] px-[6px] bg-[#DDDDDD]">
            {tasks?.length}
          </div>
        </div>

        <ModalComponent
          title="Add Task"
          _ref={addTaskRef}
          trigger={<SvgIcon clickable iconName="plus" />}
        >
          <AddTask category={category} close={addTaskRef.close} />
        </ModalComponent>
      </div>
      {tasks?.map((el, key) => (
        <TaskCard
          category={category}
          key={key}
          id={el.id}
          title={el.title}
          description={el.description}
          due_date={el.due_date}
          priority={el.priority}
        />
      ))}
    </div>
  );
};

export default CategoryComponent;
