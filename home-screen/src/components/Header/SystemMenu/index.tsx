import React from "react";
import NotificationCenter from "./NotificationCenter";
import ControlCenter from "./ControlCenter";
import styled from "styled-components";
import Spotlight from "./Spotlight";

const SystemMenu = () => {
  return (
    <SystemMenuContainer>
      <Spotlight />
      <ControlCenter />
      <NotificationCenter />
    </SystemMenuContainer>
  );
};

export default SystemMenu;

const SystemMenuContainer = styled.div`
  display: flex;
`;
