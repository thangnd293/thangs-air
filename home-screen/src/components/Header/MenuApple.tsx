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
} from "../ui/DropdownMenu";
import { MenuButton } from "./styles";

const MenuApple = () => {
  return (
    <DropdownMenuRoot modal={false}>
      <DropdownMenuTrigger asChild>
        <MenuButton>
          <AppleIcon />
        </MenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={1} align="start">
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
                <DropdownMenuItem>
                  Save Page As… <RightSlot>⌘+S</RightSlot>
                </DropdownMenuItem>
                <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
                <DropdownMenuItem>Name Window…</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Developer Tools</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Force Quit... <RightSlot>⌘+B</RightSlot>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Sleep</DropdownMenuItem>
          <DropdownMenuItem>Restart...</DropdownMenuItem>
          <DropdownMenuItem>Shut Down...</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Lock Screen <RightSlot>⌘+B</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Log Out Thang Nguyen... <RightSlot>⌘+B</RightSlot>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default MenuApple;

const AppleIcon = styled.div`
  width: 14px;
  height: 14px;
  background: url(${images.appleSmall}) no-repeat center center;
  background-size: contain;
  background-color: transparent;
`;
