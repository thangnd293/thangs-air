import { useDesktopStore } from "@/stores/desktop";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import AppIcon from "./AppIcon";
import CollapseAppIcon from "./MinimizedAppIcon";

const Dock = () => {
  const { appList, minimizeList, isFullscreen } = useDesktopStore((state) => ({
    appList: state.appList,
    minimizeList: state.minimizeAppList,
    isFullscreen: state.openAppList.some((app) => app.isFullscreen),
  }));

  return (
    <DockContainer
      id="dock"
      initial={{ x: "-50%" }}
      animate={{
        y: isFullscreen ? "110%" : 0,
      }}
      transition={{
        type: "tween",
      }}
    >
      <AnimatePresence>
        {appList.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}

        {minimizeList.length > 0 && (
          <Divider
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{
              opacity: 0,
            }}
          />
        )}

        {minimizeList.map((app) => (
          <CollapseAppIcon key={app.id + "minimized"} app={app} />
        ))}
      </AnimatePresence>
    </DockContainer>
  );
};

export default Dock;

const DockContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  height: 82px;
  width: fit-content;
  border-radius: 24px;
  padding: 0 2px;
  background-color: rgba(94, 94, 95, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: fixed;
  bottom: 6px;
  left: 50%;
  z-index: 100;
`;

const Divider = styled(motion.div)`
  width: 1px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.3);
`;
