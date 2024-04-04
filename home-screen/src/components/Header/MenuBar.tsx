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
  padding: 0 6px;
  background-color: rgba(34, 33, 33, 0.55);
  backdrop-filter: blur(100px);
`;
