import GeneralLayout from "@/layouts/general-layout/general-layout.layout";
import { NextPageWithLayout } from "./_app";
import SvgIcon from "@/components/svg-icon/svg-icon.component";
import { CATEGORIES, CATEGORY_TYPE } from "@/helpers/constants";
import dayjs from "dayjs";
import { ChangeEvent, useMemo, useState } from "react";
import useGetTasks from "@/react-query/queries/useGetTasks";
import CategoryComponent from "@/components/category/category.component";
import { useRouter } from "next/router";

const HomePage: NextPageWithLayout = () => {
  const { query, push } = useRouter();

  const search = query.search;

  const filters = useMemo(() => {
    return { search: search as string };
  }, [search]);

  const [date, setDate] = useState(dayjs());

  const { data } = useGetTasks(filters);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      push({ pathname: "/", query: { search: e.target.value } });
    } else {
      push("/");
    }
  };

  return (
    <>
      <div className="flex w-full justify-center xl:justify-between items-center mb-[36px] flex-wrap gap-6">
        <div className="flex gap-[16px] items-center">
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

        <div className="border p-4 h-[40px] gap-[14px] flex items-center rounded">
          <SvgIcon iconName="search" />
          <input
            onChange={handleSearchChange}
            defaultValue={search}
            className="outline-none"
            placeholder="Search by anything"
          />
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
