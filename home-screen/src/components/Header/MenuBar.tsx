import React from "react";
import styled from "styled-components";
import AppMenu from "./AppMenu";
import SystemMenu from "./SystemMenu";
import { MENU_BAR_HEIGHT } from "@/constant";

const MenuBar = () => {
  return (
    <MenuBarContainer>
      <AppMenu />
      <SystemMenu />
    </MenuBarContainer>
  );
};

export default MenuBar;

const MenuBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_BAR_HEIGHT}px;
  padding: 0 4px;
  background-color: rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(100px);
`;
