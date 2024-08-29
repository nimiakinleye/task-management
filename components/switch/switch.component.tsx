import React, { FC } from "react";
import * as Switch from "@radix-ui/react-switch";

interface IProps {
  onCheckedChange: (e: boolean) => void;
}

const SwitchComponent: FC<IProps> = ({ onCheckedChange }) => (
  <Switch.Root
    onCheckedChange={onCheckedChange}
    className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black dark:data-[state=checked]:bg-gray-300 outline-none cursor-default"
    // style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
  >
    <Switch.Thumb className="block w-[21px] h-[21px] bg-white dark:bg-gray-800 rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
  </Switch.Root>
);

export default SwitchComponent;
