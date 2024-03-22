import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  RightSlot,
} from "../ui/DropdownMenu";
import { MenuButton } from "./styles";

const WindowMenu = () => {
  return (
    <DropdownMenuRoot modal={false}>
      <DropdownMenuTrigger asChild>
        <MenuButton>Window</MenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={1} align="start">
          <DropdownMenuItem>
            Minimize <RightSlot>⌘M</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>Zoom</DropdownMenuItem>
          <DropdownMenuItem>
            Move Window to Left Side of Screen
          </DropdownMenuItem>
          <DropdownMenuItem>
            Move Window to Right Side of Screen
          </DropdownMenuItem>
          <DropdownMenuItem>Replace Tiled Window</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Remove Window from Set</DropdownMenuItem>
          <DropdownMenuItem>
            Cycle Through Windows <RightSlot>⌘`</RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem>Show Progress Window</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Bring All to Front</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default WindowMenu;
