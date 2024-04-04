import React from "react";
import styled from "styled-components";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "../../ui/DropdownMenu";
import { MenuButton } from "../styles";

const HelpMenu = () => {
  return (
    <DropdownMenuRoot modal={false}>
      <DropdownMenuTrigger asChild>
        <MenuButton>Help</MenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContentStyled sideOffset={1} align="start">
          <DropdownMenuItem asChild>
            <SearchInput
              onClick={(e) => e.preventDefault()}
              placeholder="Search"
              autoFocus
            />
          </DropdownMenuItem>

          <DropdownMenuItem>Tips for Your Mac</DropdownMenuItem>
          <DropdownMenuItem>macOS Help</DropdownMenuItem>
        </DropdownMenuContentStyled>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default HelpMenu;

const DropdownMenuContentStyled = styled(DropdownMenuContent)`
  width: 360px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1px 8px;
  margin-bottom: 7px;
  border-radius: 4px;
  border: none;
  outline: var(--border-color);
  outline-style: inset;
  outline-width: 1px;
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;

  &::placeholder {
    color: white;
    opacity: 0.5;
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
