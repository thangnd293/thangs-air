import { MENU_BAR_HEIGHT } from "@/constant";
import React, { useRef } from "react";
import styled from "styled-components";
import DesktopWindows from "./DesktopWindows";
import DesktopMenu from "./DesktopMenu";
import Dock from "../Dock";

const Desktop = () => {
  const desktopRef = useRef<HTMLDivElement>(null);

  const onContextMenu = (e: React.MouseEvent) => {
    // Just open the context menu if the click is on the desktop
    if (e.target !== desktopRef.current) e.preventDefault();
  };

  return (
    <DesktopMenu>
      <DesktopInnerContent
        id="desktop"
        ref={desktopRef}
        onContextMenu={onContextMenu}
      >
        <DesktopWindows />
        <Dock />
      </DesktopInnerContent>
    </DesktopMenu>
  );
};

export default Desktop;

const DesktopInnerContent = styled.div`
  height: calc(100% - ${MENU_BAR_HEIGHT}px);
  width: 100%;
  margin-top: ${MENU_BAR_HEIGHT}px;
  overflow: hidden;
`;
