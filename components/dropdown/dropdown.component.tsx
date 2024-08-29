import React, { CSSProperties, ReactElement, ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface IProps {
  trigger: ReactElement;
  children: ReactNode;
  alignOffset?: number;
  sideOffset?: number;
  style?: CSSProperties;
}

const DropdownComponent = ({
  trigger,
  children,
  alignOffset = -8,
  sideOffset = 8,
  style,
}: IProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div aria-label="Customise options">{trigger}</div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white px-2 py-2 flex flex-col gap-[8px] border border-[#D0D5DD] rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          align="end"
          style={style}
        >
          {children}

          {/* <DropdownMenu.Arrow className="fill-white" /> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

DropdownComponent.Item = function DropdownComponentItem({
  children,
  onSelect,
  danger,
}: {
  children: ReactNode;
  onSelect: () => void;
  danger?: boolean;
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={`group text-[13px] p-2 leading-none text-[#252C32] rounded-[3px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 ${
        danger
          ? "text-[#E60C02] data-[highlighted]:bg-[#E60C02] data-[highlighted]:text-white"
          : ""
      }`}
    >
      {children}
    </DropdownMenu.Item>
  );
};

DropdownComponent.Sub = function DropdownComponentSub({
  children,
  trigger,
}: {
  children: ReactNode;
  trigger: ReactElement;
}) {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="group text-[13px] p-2 leading-none text-[#252C32] rounded-[3px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
        {trigger}
      </DropdownMenu.SubTrigger>

      <DropdownMenu.Portal>
        <DropdownMenu.SubContent className="bg-white px-2 py-2 flex flex-col gap-[8px] border border-[#D0D5DD] rounded-md p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
          {children}
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};

export default DropdownComponent;
