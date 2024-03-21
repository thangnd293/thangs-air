import { App, useDesktopStore } from "@/stores/desktop";
import React from "react";
import styled, { css } from "styled-components";
import { publicAppUnMinimized } from "../Window/utils";

interface AppIconProps {
  app: App;
}
const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const openApp = useDesktopStore((state) => state.openApp);

  const onOpenApp = () => {
    publicAppUnMinimized(app);

    openApp(app.id);
  };

  return (
    <AppIconContainer
      onClick={onOpenApp}
      $shortcut={app.shortcut}
      $isOpen={app.isOpen}
    />
  );
};

export default AppIcon;

const AppIconContainer = styled.button<{ $shortcut: string; $isOpen: boolean }>`
  position: relative;
  box-sizing: content-box;
  width: 54px;
  height: 55px;
  border-radius: 22px;
  border: none;
  padding: 13px 9px;
  background: url(${(props) => props.$shortcut}) no-repeat center center;
  background-size: cover;
  background-origin: content-box;
  margin-bottom: 5px;
  cursor: pointer;
  background-origin: content-box;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      &::before {
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgb(173, 164, 194);
      }
    `}
`;
