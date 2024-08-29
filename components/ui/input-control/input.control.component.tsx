import { ReactNode } from "react";
import styles from "./styles.module.css";

interface IProps {
  children: ReactNode;
}

const InputControl = ({ children }: IProps) => {
  return (
    <div className={`${styles.input_control} flex flex-col w-full gap-[6px]`}>
      {children}
    </div>
  );
};

InputControl.Error = function InputControlError({ text }: { text: string }) {
  return <span className="font-regular text-[12px] text-red-500">{text}</span>;
};

export default InputControl;
