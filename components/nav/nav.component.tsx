import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import Logo from "@/public/LOGO.png";
import SvgIcon from "../svg-icon/svg-icon.component";
import SVGs from "@/public/svg";
import SwitchComponent from "../switch/switch.component";

const NavData = [
  { title: "Calendar", link: "/calendar", iconName: "calendar" },
  { title: "Inbox", link: "/calendar", iconName: "inbox" },
  { title: "Notes", link: "/calendar", iconName: "notes" },
  { title: "Todo List", link: "/calendar", iconName: "todo-list" },
  { title: "Settings", link: "/calendar", iconName: "notes" },
];

interface IProps {
  showNav: boolean;
  toggleNav: () => void;
}

const Nav: FC<IProps> = ({ showNav }) => {
  const handleToggleDisplayMode = (e: boolean) => {
    const htmlElement = document.documentElement;
    if (e) {
      return htmlElement.classList.add("dark");
    }
    return htmlElement.classList.remove("dark");
  };
  return (
    <aside
      className={`${
        showNav
          ? "fixed block col-span-4 translate-x-0"
          : "hidden translate-x-[-200vw]"
      } lg:col-span-2 transition ease-in-out bg-white dark:bg-gray-100 h-screen xl:block lg:translate-x-0`}
    >
      <div className="flex justify-center items-center mt-[42.56px] mb-[62.56px]">
        <Image
          className="p-4 rounded dark:bg-white"
          alt="Techinnover"
          src={Logo}
        />
      </div>
      <nav className="flex flex-col">
        {NavData.map((nav, key) => (
          <Link
            href={nav.link}
            key={key}
            className={`p-[27px] uppercase text-[#65676D] dark:text-gray-500 dark:hover:text-gray-900 hover:bg-[#F5F3FF] font-semibold ${
              nav.title === "Calendar"
                ? "bg-[#F5F3FF] border-r-[6px] border-[#4F35F3]"
                : ""
            }`}
          >
            <div
              className={`flex gap-[20px] ${
                nav.title === "Calendar" ? "text-[#4F35F3]" : ""
              }`}
            >
              <SvgIcon
                width={25}
                height={25}
                iconName={nav.iconName as keyof typeof SVGs}
              />
              {nav.title}
            </div>
          </Link>
        ))}

        <div className="mt-[128px] p-[27px] flex items-center gap-4">
          <p className="font-medium dark:text-black text-[14px]">Dark Mode</p>
          <SwitchComponent
            onCheckedChange={(e) => handleToggleDisplayMode(e)}
          />
        </div>
      </nav>
    </aside>
  );
};

export default Nav;
