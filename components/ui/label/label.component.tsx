import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Label: FC<IProps> = ({ children }) => {
  return (
    <label className="font-medium text-[#1A1919] text-[14px]">{children}</label>
  );
};

export default Label;
