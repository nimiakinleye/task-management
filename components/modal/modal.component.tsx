import React, { forwardRef, ReactElement, ReactNode, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import SvgIcon from "../svg-icon/svg-icon.component";
import { ModalRefType } from "@/hooks/useModalRef";

interface IProps {
  title: string;
  children: ReactNode;
  trigger: ReactElement;
  _ref?: ReturnType<ModalRefType>;
  onOpen?: () => void;
}

const ModalComponent = forwardRef<ModalRefType, IProps>(
  ({ title, children, trigger, _ref, onOpen }) => {
    useEffect(() => {
      if (onOpen && _ref?.show) {
        onOpen();
      }
    }, [_ref?.show, onOpen]);

    return (
      <Dialog.Root open={_ref?.show} onOpenChange={_ref?.setShow}>
        <Dialog.Trigger asChild>
          <div>{trigger}</div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="backdrop-blur-sm bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            style={{ width: "min(100%, 462px)" }}
            className="py-[44px] px-[32px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] translate-x-[-50%] translate-y-[-50%] bg-white p-[25px] focus:outline-none"
          >
            <div className="flex justify-between items-center mb-[32px]">
              <Dialog.Title className="m-0 text-[24px] text-[#1A1919] font-semibold">
                {title}
              </Dialog.Title>

              <Dialog.Close>
                <SvgIcon iconName="close-circle" />
              </Dialog.Close>
            </div>

            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

ModalComponent.displayName = "ModalComponent";

export default ModalComponent;
