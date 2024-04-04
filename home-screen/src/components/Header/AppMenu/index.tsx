import React from "react";
import styled from "styled-components";
import MenuApple from "./MenuApple";
import WindowMenu from "./WindowMenu";
import HelpMenu from "./HelpMenu";

const AppMenu = () => {
  return (
    <AppMenuContainer>
      <MenuApple />
      <WindowMenu />
      <HelpMenu />
    </AppMenuContainer>
  );
};

export default AppMenu;

const AppMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
