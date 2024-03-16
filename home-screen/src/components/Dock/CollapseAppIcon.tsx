import { CollapseApp, useDesktopStore } from "@/stores/desktop";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicAppUnCollapsed } from "../Window/utils";

interface CollapseAppIconProps {
  app: CollapseApp;
}
const CollapseAppIcon: React.FC<CollapseAppIconProps> = ({ app }) => {
  const [screenshot, setScreenshot] = useState("");
  const openApp = useDesktopStore((state) => state.openApp);

  useEffect(() => {
    app.screenshot.then((screenshot) => {
      setScreenshot(screenshot);
    });
  }, [app.screenshot]);

  const onOpenApp = () => {
    publicAppUnCollapsed(app);

    openApp(app.id);
  };

  return (
    <CollapseAppIconContainer
      initial={{ opacity: 0, width: 0, padding: 0 }}
      animate={{
        opacity: 1,
        width: 64,
        padding: "13px 9px",
        transition: { delay: 0.3 },
      }}
      exit={{ opacity: 0, width: 0, padding: 0 }}
      layout
      $screenshot={screenshot}
      onClick={onOpenApp}
    >
      <Shortcut
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 20 }}
        exit={{ opacity: 0, width: 0 }}
        layout
        $shortcut={app.shortcut}
      />
    </CollapseAppIconContainer>
  );
};

export default CollapseAppIcon;

const CollapseAppIconContainer = styled(motion.button)<{
  $screenshot: string;
}>`
  position: relative;
  width: 64px;
  height: 55px;
  border: none;
  background: url(${(props) => props.$screenshot}) no-repeat center center;
  background-size: contain;
  background-origin: content-box;
  cursor: pointer;
  padding: 13px 9px;
  margin-bottom: 4px;
  box-sizing: content-box;
`;

const Shortcut = styled(motion.div)<{
  $shortcut: string;
}>`
  position: absolute;
  bottom: 16px;
  right: 12px;
  width: 20px;
  height: 20px;
  background: url(${(props) => props.$shortcut}) no-repeat center center;
  background-size: contain;
`;
