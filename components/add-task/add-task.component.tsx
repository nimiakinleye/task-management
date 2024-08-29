import { FC, useMemo } from "react";
import { useForm } from "react-hook-form";
import InputControl from "../ui/input-control/input.control.component";
import Label from "../ui/label/label.component";
import dayjs from "dayjs";
import DropdownComponent from "../dropdown/dropdown.component";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import SvgIcon from "../svg-icon/svg-icon.component";
import {
  CATEGORIES,
  PRIORITY_OPTIONS,
  PRIORITY_TYPE,
} from "@/helpers/constants";
import formatPriorityStyle from "@/utils/formatPriorityStyle";
import useAddTask, {
  CreateTaskPayload,
} from "@/react-query/mutations/useAddTask";
import { v4 as uuidv4 } from "uuid";
import useUpdateTask from "@/react-query/mutations/useUpdateTask";

interface IAddTaskPayloadType {
  name: string;
  description?: string;
  priority: PRIORITY_TYPE;
  due_date: string;
  due_time: string;
}

type Props = {
  close: () => void;

  edit?: boolean;
} & (
  | {
      edit: true;
      values: {
        title: string;
        description?: string;
        priority: PRIORITY_TYPE;
        due_date: string;
        id: string;
      };
      category?: never;
    }
  | { edit?: false; values?: never; category: keyof typeof CATEGORIES }
);

const AddTask: FC<Props> = ({ close, values, category, edit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IAddTaskPayloadType>({
    defaultValues: {
      name: values?.title,
      description: values?.description,
      priority: values?.priority,
      due_date: values?.due_date
        ? dayjs(values.due_date).format("YYYY-MM-DD")
        : "",
      due_time: values?.due_date ? dayjs(values.due_date).format("HH:mm") : "",
    },
  });

  const { mutate: addTask, isPending: addingTask } = useAddTask(close);
  const { mutate: updateTask, isPending: updatingTask } = useUpdateTask(
    values?.id as string,
    close
  );

  const loading = useMemo(
    () => addingTask || updatingTask,
    [addingTask, updatingTask]
  );

  const onSubmit = (data: IAddTaskPayloadType) => {
    const payload: CreateTaskPayload = {
      title: data.name,
      description: data.description,
      category: category ?? "to_do",
      priority: data.priority,
      due_date: dayjs(`${data.due_date}T${data.due_time}`).toISOString(),
      id: edit ? values?.id : uuidv4(),
    };

    if (edit && values.id) {
      return updateTask(payload);
    }

    if (!edit) {
      addTask(payload);
    }
  };

  const [priority, date] = watch(["priority", "due_date"]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <InputControl>
          <Label>Task Name</Label>

          <input
            {...register("name", {
              required: "Name is required to create task",
            })}
            placeholder="Enter task name"
          />
          <InputControl.Error text={errors.name?.message as string} />
        </InputControl>

        <InputControl>
          <Label>
            Description{" "}
            <span className="font-regular text-[14px] text-[#848585]">
              (Optional)
            </span>
          </Label>

          <textarea
            {...register("description")}
            placeholder="Enter task name"
          />
        </InputControl>

        <InputControl>
          <Label>Priority</Label>

          <input
            style={{ display: "none" }}
            {...register("priority", {
              required: "Priority is required to create a task",
            })}
          />

          <DropdownComponent
            alignOffset={12}
            sideOffset={-12}
            style={{ padding: 0, gap: 0 }}
            trigger={
              <div className="h-[48px] capitalize border flex justify-between items-center px-[22px] rounded-[12px] py-[12px]">
                {priority ? (
                  <p
                    className={`px-[8px] px-1 text-[12px] rounded-[4px] ${formatPriorityStyle(
                      priority
                    )}`}
                  >
                    {priority}
                  </p>
                ) : (
                  <span className="font-regular text-[14px] text-[#848585]">
                    Select a priority
                  </span>
                )}

                <div>
                  <SvgIcon
                    clickable
                    width={12}
                    height={7.94}
                    iconName="caret-down"
                  />
                </div>
              </div>
            }
          >
            {PRIORITY_OPTIONS.map((option, key) => (
              <DropdownMenuItem
                onSelect={() => setValue("priority", option)}
                key={key}
                className={`capitalize w-[189px] px-3 py-2 text-[12px] flex justify-between items-center ${formatPriorityStyle(
                  option
                )} bg-opacity-0 hover:bg-opacity-100`}
              >
                {option}

                {priority === option && <SvgIcon iconName="tick" />}
              </DropdownMenuItem>
            ))}
          </DropdownComponent>

          <InputControl.Error text={errors.priority?.message as string} />
        </InputControl>

        <div className="flex justify-between gap-4">
          <InputControl>
            <Label>Deadline</Label>

            <input
              type="text"
              placeholder="Due date"
              {...register("due_date", {
                required: "Due date is required to create task",
                validate: {
                  dateNotPast: (value) =>
                    dayjs(value).diff(dayjs(), "day") >= 0 ||
                    "Day must be present or future",
                },
              })}
              min={dayjs().format("YYYY-MM-DD")}
              onFocus={(e) => (e.target.type = "date")}
            />
            <InputControl.Error text={errors.due_date?.message as string} />
          </InputControl>

          <InputControl>
            <Label>Time</Label>

            <input
              type="text"
              placeholder="Due time"
              {...register("due_time", {
                required: "Due time is required to create task",
                validate: {
                  checkDateAndTime: (value) =>
                    dayjs(`${date}T${value}`).diff(dayjs()) >= 0 ||
                    "Time must be present or future",
                },
              })}
              onFocus={(e) => (e.target.type = "time")}
            />
            <InputControl.Error text={errors.due_time?.message as string} />
          </InputControl>
        </div>

        <button
          className={`w-full text-white rounded-[12px] mt-[30px] py-3 bg-[#4F35F3] ${
            loading && "bg-opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </>
  );
};

export default AddTask;
