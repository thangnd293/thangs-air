import * as ContextMenu from "@radix-ui/react-context-menu";
import styled, { css } from "styled-components";

const menuItem = css`
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  border: none;
  outline: none;
  color: white;

  &:hover {
    background-color: #0a85ff;
  }
`;

const menuContent = css`
  min-width: 220px;
  background-color: rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(15px);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export const ContextMenuContent = styled(ContextMenu.Content)`
  ${menuContent}
`;

export const ContextMenuSubContent = styled(ContextMenu.SubContent)`
  ${menuContent}
`;

export const ContextMenuItem = styled(ContextMenu.Item)`
  ${menuItem}
`;

export const ContextMenuSubTrigger = styled(ContextMenu.SubTrigger)`
  ${menuItem}

  &[data-state="open"] {
    background-color: #657381;
  }
`;

export const ContextMenuSeparator = styled(ContextMenu.Separator)`
  height: 1px;
  background-color: var(--border-color);
  margin: 5px;
`;

export const ContextMenuRadioItem = styled(ContextMenu.RadioItem)`
  ${menuItem}
  padding: 6px 18px;
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
  padding-left: 20px;
  color: #fff;
`;
