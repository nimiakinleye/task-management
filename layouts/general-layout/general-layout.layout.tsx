import Nav from "@/components/nav/nav.component";
import SvgIcon from "@/components/svg-icon/svg-icon.component";
import Head from "next/head";
import { FC, ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
  pageTitle: string;
}

const GeneralLayout: FC<IProps> = ({ children, pageTitle }) => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <Head>
        <title>{`Techinnover | ${pageTitle}`}</title>
      </Head>

      <div className="xl:grid grid-cols-12 min-h-screen">
        <Nav showNav={showNav} toggleNav={toggleNav} />

        <main className="flex flex-col items-center xl:items-start col-span-10 px-8 pt-[42.56px] xl:pl-[32px]">
          <div className="my-4 flex self-end xl:hidden">
            <SvgIcon onClick={toggleNav} iconName={showNav ? "close-circle" : "notes"} />
          </div>
          {children}
        </main>
      </div>
    </>
  );
};

export default GeneralLayout;
