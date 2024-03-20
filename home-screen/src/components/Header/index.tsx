import { MENU_BAR_HEIGHT, WINDOW_BAR_HEIGHT } from "@/constant";
import { useDesktopStore } from "@/stores/desktop";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar";
import WindowControlBar from "./WindowControlBar";

const HEADER_HEIGHT = MENU_BAR_HEIGHT + WINDOW_BAR_HEIGHT;

const Header = () => {
  const isFullscreen = useDesktopStore((state) =>
    state.openAppList.some((app) => app.isFullscreen)
  );

  const isVisible = useIsVisibleHeader(isFullscreen);

  return (
    <HeaderContainer
      animate={{ y: isVisible ? 0 : -HEADER_HEIGHT }}
      transition={{
        type: "tween",
      }}
    >
      <MenuBar />
      <WindowControlBar />
    </HeaderContainer>
  );
};

export default Header;

const useIsVisibleHeader = (enable: boolean) => {
  const [isVisible, setIsVisible] = useState(!enable);

  useEffect(() => {
    if (!enable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < HEADER_HEIGHT) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enable]);

  return isVisible;
};

const HeaderContainer = styled(motion.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
`;
