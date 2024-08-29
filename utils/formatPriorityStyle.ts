import { PRIORITY_TYPE } from "@/helpers/constants";

const formatPriorityStyle = (priority: PRIORITY_TYPE) => {
  return priority === "low"
    ? "text-[#EC5962] bg-[#FDF2F2]"
    : priority === "high"
    ? "text-[#4F9C20] bg-[#EBFAE2]"
    : priority === "medium"
    ? "text-[#3069FE] bg-[#EEF3FF]"
    : "";
};

export default formatPriorityStyle;
