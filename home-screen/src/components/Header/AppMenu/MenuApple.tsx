import { ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

import { images } from "@/assets/images";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  RightSlot,
} from "../../ui/DropdownMenu";
import { MenuButton } from "../styles";

const MenuApple = () => {
  return (
    <DropdownMenuRoot modal={false}>
      <DropdownMenuTrigger asChild>
        <MenuButton>
          <AppleIcon />
        </MenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContentStyled sideOffset={1} align="start">
          <DropdownMenuItem>About This Mac</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>System Settings...</DropdownMenuItem>
          <DropdownMenuItem>App Store...</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Recent Items
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={2} alignOffset={-5}>
                <DropdownMenuItem>Save Page As…</DropdownMenuItem>
                <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
                <DropdownMenuItem>Name Window…</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Developer Tools</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Force Quit... <RightSlot>⌥⌘⎋</RightSlot>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Sleep</DropdownMenuItem>
          <DropdownMenuItem>Restart...</DropdownMenuItem>
          <DropdownMenuItem>Shut Down...</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Lock Screen <RightSlot>⌃⌘Q</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Log Out Thang Nguyen... <RightSlot>⇧⌘Q</RightSlot>
          </DropdownMenuItem>
        </DropdownMenuContentStyled>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default MenuApple;

const DropdownMenuContentStyled = styled(DropdownMenuContent)`
  width: 270px;
`;

const AppleIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-bottom: 1px;
  margin-left: -2px;
  background: url(${images.appleSmall}) no-repeat center center;
  background-size: contain;
  background-color: transparent;
`;
