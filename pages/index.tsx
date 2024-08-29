import GeneralLayout from "@/layouts/general-layout/general-layout.layout";
import { NextPageWithLayout } from "./_app";
import SvgIcon from "@/components/svg-icon/svg-icon.component";
import { CATEGORIES, CATEGORY_TYPE } from "@/helpers/constants";
import dayjs from "dayjs";
import { useState } from "react";
import useGetTasks from "@/react-query/queries/useGetTasks";
import CategoryComponent from "@/components/category/category.component";

const HomePage: NextPageWithLayout = () => {
  const [date, setDate] = useState(dayjs());

  const { data } = useGetTasks();

  return (
    <>
      <div className="flex gap-[16px] items-center mb-[36px]">
        <h2 className="font-semibold text-lg xl:text-[36px]">
          {date.format("D MMMM YYYY")}
        </h2>

        <div
          onClick={() => setDate(date.subtract(1, "day"))}
          className="p-[10px] bg-white rounded-full border border-[#DCDCDC] w-[40px] h-[40px] cursor-pointer"
        >
          <SvgIcon iconName="arrow-left" />
        </div>

        <div
          onClick={() => setDate(date.add(1, "day"))}
          className="p-[10px] bg-white rounded-full border border-[#DCDCDC] w-[40px] h-[40px] cursor-pointer"
        >
          <SvgIcon iconName="arrow-right" />
        </div>
      </div>

      <div className="flex gap-[24px] w-full justify-center xl:justify-start align-center flex-wrap">
        {Object.keys(CATEGORIES).map((el, key) => {
          return (
            <CategoryComponent
              key={key}
              category={el as CATEGORY_TYPE}
              tasks={data ? data[el as CATEGORY_TYPE] : []}
            />
          );
        })}
      </div>
    </>
  );
};

HomePage.getLayout = (page) => {
  return <GeneralLayout pageTitle="View Tasks">{page}</GeneralLayout>;
};

export default HomePage;
