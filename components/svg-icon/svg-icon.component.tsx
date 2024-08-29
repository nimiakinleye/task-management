import SVGs from "@/public/svg";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  iconName: keyof typeof SVGs;
  width?: number;
  height?: number;
  clickable?: boolean;
  onClick?: () => void;
}

const SvgIcon: FC<IProps> = ({
  iconName,
  width,
  height,
  clickable,
  onClick,
}) => {
  return (
    <Image
      className={`${clickable && "cursor-pointer"}`}
      style={{ fill: "red" }}
      src={SVGs[iconName]}
      alt={iconName}
      width={width || 16}
      height={height || 16}
      onClick={onClick}
    />
  );
};

export default SvgIcon;
