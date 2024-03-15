import { useDesktopStore } from "@/stores/desktop";
import React from "react";
import styled from "styled-components";
import AppIcon from "./AppIcon";

const Dock = () => {
  const appList = useDesktopStore((state) => state.appList);
  const collapseList = useDesktopStore((state) => state.collapseList);

  return (
    <DockContainer>
      {appList.map((app) => (
        <AppIcon key={app.id} app={app} />
      ))}
      <Divider />
      {collapseList.map((app) => (
        <AppIcon key={app.id} app={app} />
      ))}
    </DockContainer>
  );
};

export default Dock;

const DockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 90px;
  width: 1250px;
  border-radius: 26px;
  padding: 0 12px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

const Divider = styled.div`
  width: 1px;
  height: 50px;
  background-color: #fff;
`;
