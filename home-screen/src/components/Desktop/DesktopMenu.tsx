import * as ContextMenu from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React, { Fragment, PropsWithChildren } from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSubTrigger,
  RightSlot,
  ContextMenuSubContent,
  ContextMenuRadioItem,
  ContextMenuItemIndicator,
} from "./DesktopMenu.styles";

const DesktopMenu: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenuContent>
          <ContextMenuItem>New Folder</ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem>Get Info</ContextMenuItem>
          <ContextMenuItem>Change Wallpaper...</ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem>Use Stacks</ContextMenuItem>

          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Sort By
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </ContextMenuSubTrigger>

            <ContextMenu.Portal>
              <ContextMenuSubContent>
                <ContextMenu.RadioGroup value="none">
                  {sortByOptions.map((option) => (
                    <Fragment key={option.value}>
                      <ContextMenuRadioItem value={option.value}>
                        <ContextMenuItemIndicator>
                          {option.hasDivider && <CheckIcon />}
                        </ContextMenuItemIndicator>
                        {option.label}
                      </ContextMenuRadioItem>
                      {option.hasDivider && <ContextMenuSeparator />}
                    </Fragment>
                  ))}
                </ContextMenu.RadioGroup>
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenuItem>Clean Up</ContextMenuItem>

          <ContextMenu.Sub>
            <ContextMenuSubTrigger>
              Clean Up By
              <RightSlot>
                <ChevronRightIcon />
              </RightSlot>
            </ContextMenuSubTrigger>
            <ContextMenu.Portal>
              <ContextMenuSubContent>
                {cleanUpByOptions.map((option) => (
                  <ContextMenuItem key={option}>{option}</ContextMenuItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <ContextMenuItem>Show View Options</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default DesktopMenu;

const sortByOptions = [
  {
    value: "none",
    label: "None",
    hasDivider: true,
  },
  {
    value: "snap-to-grid",
    label: "Snap to Grid",
    hasDivider: true,
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "kind",
    label: "Kind",
  },
  {
    value: "date-last-opened",
    label: "Date Last Opened",
  },
  {
    value: "date-added",
    label: "Date Added",
  },
  {
    value: "date-modified",
    label: "Date Modified",
  },
  {
    value: "date-created",
    label: "Date Created",
  },
  {
    value: "size",
    label: "Size",
  },
  {
    value: "tags",
    label: "Tags",
  },
];

const cleanUpByOptions = [
  "Name",
  "Kind",
  "Date Modified",
  "Date Created",
  "Size",
  "Tags",
];
