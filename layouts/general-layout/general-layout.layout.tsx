import Nav from "@/components/nav/nav.component";
import Head from "next/head";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  pageTitle: string;
}

const GeneralLayout: FC<IProps> = ({ children, pageTitle }) => {
  return (
    <>
      <Head>
        <title>{`Techinnover | ${pageTitle}`}</title>
      </Head>

      <div className="xl:grid grid-cols-12 min-h-screen">
        <Nav />

        <main className="flex flex-col items-center xl:items-start col-span-10 px-8 pt-[42.56px] xl:pl-[32px]">
          {children}
        </main>
      </div>
    </>
  );
};

export default GeneralLayout;
