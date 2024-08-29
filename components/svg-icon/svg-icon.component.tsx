import SVGs from "@/public/svg";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  iconName: keyof typeof SVGs;
  width?: number;
  height?: number;
  clickable?: boolean;
}

const SvgIcon: FC<IProps> = ({ iconName, width, height, clickable }) => {
  return (
    <Image
      className={`${clickable && "cursor-pointer"}`}
      style={{ fill: "red" }}
      src={SVGs[iconName]}
      alt={iconName}
      width={width || 16}
      height={height || 16}
    />
  );
};

export default SvgIcon;
