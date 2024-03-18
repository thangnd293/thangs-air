import { MENU_BAR_HEIGHT } from "@/constant";
import { useDesktopStore } from "@/stores/desktop";
import Dock from "@components/Dock";
import { images } from "@components/Images";
import Window from "@components/Window";
import React from "react";
import styled from "styled-components";

const Desktop = () => {
  const openAppList = useDesktopStore((state) => state.openAppList);

  return (
    <DesktopContainer id="desktop">
      {openAppList.map((app) => (
        <Window key={app.id} app={app}>
          {app.component}
        </Window>
      ))}
      <Dock />
    </DesktopContainer>
  );
};

export default Desktop;

const DesktopContainer = styled.div`
  height: calc(100vh - ${MENU_BAR_HEIGHT}px);
  width: 100%;
  margin-top: ${MENU_BAR_HEIGHT}px;
  overflow: hidden;
  background: lightblue url(${images.wallpaper}) no-repeat fixed center;
`;
