import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled, { css } from "styled-components";

const dropdownMenuContentStyles = css`
  min-width: 220px;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(100px);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const dropdownMenuItemStyles = css`
  font-size: 13px;
  line-height: 1;
  color: white;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 3px;
  position: relative;
  user-select: none;
  outline: none;

  &[data-highlighted] {
    background-color: var(--item-highlight-bg);
  }

  & ~ & {
    margin-top: 1px;
  }
`;

const DropdownMenuContent = styled(DropdownMenu.Content)`
  ${dropdownMenuContentStyles}
`;

const DropdownMenuSubContent = styled(DropdownMenu.SubContent)`
  ${dropdownMenuContentStyles}
`;

const DropdownMenuItem = styled(DropdownMenu.Item)`
  ${dropdownMenuItemStyles}
`;

const DropdownMenuCheckboxItem = styled(DropdownMenu.CheckboxItem)`
  ${dropdownMenuItemStyles}
`;

const DropdownMenuRadioItem = styled(DropdownMenu.RadioItem)`
  ${dropdownMenuItemStyles}
`;

const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger)`
  ${dropdownMenuItemStyles}

  &[data-state='open'] {
    background-color: #f5f5f5;
    color: #000;
  }
`;

const DropdownMenuSeparator = styled(DropdownMenu.Separator)`
  height: 1px;
  background-color: var(--border-color);
  margin: 5px 8px;
`;

const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const DropdownMenuArrow = styled(DropdownMenu.Arrow)`
  fill: rgba(0, 0, 0, 0.19);
`;

const RightSlot = styled.div`
  margin-left: auto;
  padding-left: 20px;
  color: #999;
`;

const DropdownMenuRoot = DropdownMenu.Root;
const DropdownMenuTrigger = DropdownMenu.Trigger;
const DropdownMenuPortal = DropdownMenu.Portal;
const DropdownMenuSub = DropdownMenu.Sub;
const DropdownMenuRadioGroup = DropdownMenu.RadioGroup;

export {
  DropdownMenuContent,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
  DropdownMenuItemIndicator,
  DropdownMenuArrow,
  RightSlot,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
};
