import * as ContextMenu from "@radix-ui/react-context-menu";
import styled, { css } from "styled-components";

const menuItem = css`
  position: relative;
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  border: none;
  outline: none;
  color: white;

  &:hover {
    background-color: var(--item-highlight-bg);
  }
`;

const menuContent = css`
  min-width: 180px;
  background-color: rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(100px);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  padding: 4px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export const ContextMenuContent = styled(ContextMenu.Content)`
  ${menuContent}
`;

export const ContextMenuSubContent = styled(ContextMenu.SubContent)`
  ${menuContent}
  min-width: unset;
`;

export const ContextMenuItem = styled(ContextMenu.Item)`
  ${menuItem}
`;

export const ContextMenuSubTrigger = styled(ContextMenu.SubTrigger)`
  ${menuItem}

  &[data-state="open"] {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const ContextMenuSeparator = styled(ContextMenu.Separator)`
  height: 1px;
  background-color: var(--border-color);
  margin: 6px;
`;

export const ContextMenuRadioItem = styled(ContextMenu.RadioItem)`
  ${menuItem}
  padding: 3px 18px;
`;

export const ContextMenuItemIndicator = styled(ContextMenu.ItemIndicator)`
  position: absolute;
  left: -6px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const RightSlot = styled.div`
  margin-left: auto;
  margin-right: -5px;
  padding-left: 20px;
  color: #fff;
`;
