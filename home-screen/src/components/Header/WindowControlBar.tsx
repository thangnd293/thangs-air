import { useCurrentFullscreenApp } from "@/hooks/useCurrentFullscreenApp";
import React from "react";
import styled from "styled-components";
import WindowActions from "../WindowActions";
import { useDesktopStore } from "@/stores/desktop";
import { publicExitFullscreen } from "./utils";
import { WINDOW_BAR_HEIGHT } from "@/constant";

const WindowControlBar = () => {
  const { appFullscreen, isFullscreen, exitFullscreen } =
    useCurrentFullscreenApp();
  const { closeApp } = useDesktopStore();

  const onClose = () => {
    closeApp(appFullscreen);
    exitFullscreen();
  };

  const onStretch = () => {
    publicExitFullscreen(appFullscreen);
    exitFullscreen();
  };

  return (
    <WindowActionsContainer $isVisible={isFullscreen}>
      <WindowActions onClose={onClose} onStretch={onStretch} />
    </WindowActionsContainer>
  );
};

export default WindowControlBar;

const WindowActionsContainer = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  background-color: cadetblue;
  height: ${WINDOW_BAR_HEIGHT}px;
`;
