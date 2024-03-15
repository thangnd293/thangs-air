import { type App } from "@/components/Providers/DesktopProvider";
import { useDesktopStore } from "@/stores/desktop";
import React from "react";
import styled from "styled-components";

interface AppIconProps {
  app: App;
}
const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const openApp = useDesktopStore((state) => state.openApp);
  return (
    <AppIconContainer onClick={() => openApp(app.id)} shortcut={app.shortcut} />
  );
};

export default AppIcon;

const AppIconContainer = styled.button<{ shortcut: string }>`
  width: 62px;
  height: 62px;
  border-radius: 16px;
  border: none;
  margin-bottom: 4px;
  background: url(${(props) => props.shortcut}) no-repeat center center;
  background-size: cover;
`;
