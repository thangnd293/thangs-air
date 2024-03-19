import { WINDOW_BAR_HEIGHT } from "@/constant";
import { useDesktopStore } from "@/stores/desktop";
import React from "react";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";
import WindowActions from "../WindowActions";

const WindowControlBar = () => {
  const { closeApp, currentApp, isFullscreen, exitFullscreen } =
    useDesktopStore(
      useShallow((state) => ({
        closeApp: state.closeApp,
        currentApp: state.currentAppConnext[0],
        isFullscreen: state.openAppList.some((app) => app.isFullscreen),
        exitFullscreen: state.exitFullscreen,
      }))
    );

  const onClose = closeApp.bind(null, currentApp?.id);

  const onExitFullscreen = exitFullscreen.bind(null, currentApp?.id);

  return (
    <WindowActionsContainer $isVisible={isFullscreen}>
      <WindowActions onClose={onClose} onStretch={onExitFullscreen} />
    </WindowActionsContainer>
  );
};

export default WindowControlBar;

const WindowActionsContainer = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  background-color: cadetblue;
  height: ${WINDOW_BAR_HEIGHT}px;
`;
