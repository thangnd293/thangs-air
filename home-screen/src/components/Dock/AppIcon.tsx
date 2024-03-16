import { App, useDesktopStore } from "@/stores/desktop";
import React from "react";
import styled from "styled-components";
import { publicAppUnCollapsed } from "../Window/utils";

interface AppIconProps {
  app: App;
}
const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const openApp = useDesktopStore((state) => state.openApp);

  const onOpenApp = () => {
    publicAppUnCollapsed(app);

    openApp(app.id);
  };

  return <AppIconContainer onClick={onOpenApp} $shortcut={app.shortcut} />;
};

export default AppIcon;

const AppIconContainer = styled.button<{ $shortcut: string }>`
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
`;
