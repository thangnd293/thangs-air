import { MENU_BAR_HEIGHT } from "@/constant";
import { App, useDesktopStore } from "@/stores/desktop";
import Dock from "@components/Dock";
import Window from "@components/Window";
import React from "react";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";

const Desktop = () => {
  const { currentApp, openAppList, currentAppConnext } = useDesktopStore(
    useShallow((state) => ({
      openAppList: state.openAppList,
      currentApp: state.currentAppConnext[0],
      currentAppConnext: state.currentAppConnext,
    }))
  );

  const calcStackIndex = (app: App) => {
    return (
      Math.abs(
        currentAppConnext.findIndex((a) => a.id === app.id) -
          currentAppConnext.length +
          1
      ) + 1
    );
  };

  return (
    <DesktopContainer id="desktop">
      {openAppList.map((app) => (
        <Window
          key={app.id}
          isFocus={currentApp?.id === app.id}
          stackIndex={calcStackIndex(app)}
          app={app}
        >
          {app.component}
        </Window>
      ))}
      <Dock />
    </DesktopContainer>
  );
};

export default Desktop;

const DesktopContainer = styled.div`
  height: calc(100% - ${MENU_BAR_HEIGHT}px);
  width: 100%;
  margin-top: ${MENU_BAR_HEIGHT}px;
  overflow: hidden;
`;
