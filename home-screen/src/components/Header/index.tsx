import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar";
import WindowControlBar from "./WindowControlBar";
import { useCurrentFullscreenApp } from "@/hooks/useCurrentFullscreenApp";
import { motion } from "framer-motion";
import { MENU_BAR_HEIGHT, WINDOW_BAR_HEIGHT } from "@/constant";

const HEADER_HEIGHT = MENU_BAR_HEIGHT + WINDOW_BAR_HEIGHT;

const Header = () => {
  const { isFullscreen } = useCurrentFullscreenApp();
  const [isVisible, setIsVisible] = useState(!isFullscreen);

  useEffect(() => {
    if (!isFullscreen) return;

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
  }, [isFullscreen]);

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

const HeaderContainer = styled(motion.div)`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
`;
