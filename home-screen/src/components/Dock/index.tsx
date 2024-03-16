import { useDesktopStore } from "@/stores/desktop";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import AppIcon from "./AppIcon";
import CollapseAppIcon from "./CollapseAppIcon";

const Dock = () => {
  const appList = useDesktopStore((state) => state.appList);
  const collapseList = useDesktopStore((state) => state.collapseList);

  return (
    <DockContainer id="dock">
      <AnimatePresence>
        {appList.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}

        {collapseList.length > 0 && (
          <Divider
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            exit={{
              opacity: 0,
            }}
          />
        )}

        {collapseList.map((app) => (
          <CollapseAppIcon key={app.id + "collapsed"} app={app} />
        ))}
      </AnimatePresence>
    </DockContainer>
  );
};

export default Dock;

const DockContainer = styled.div`
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
  transform: translateX(-50%);
  z-index: 100;
`;

const Divider = styled(motion.div)`
  width: 1px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.3);
`;
