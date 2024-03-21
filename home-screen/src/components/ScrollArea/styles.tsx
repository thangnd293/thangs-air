import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import styled from "styled-components";

export const ScrollAreaRoot = styled(RadixScrollArea.Root)`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
  --scrollbar-size: 10px;
`;

export const ScrollAreaViewport = styled(RadixScrollArea.Viewport)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
`;

export const ScrollAreaScrollbar = styled(RadixScrollArea.Scrollbar)`
  display: flex;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding: 2px;
  background: rgba(0, 0, 0, 0.1);
  transition: background 160ms ease-out;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  &[data-orientation="vertical"] {
    width: var(--scrollbar-size);
  }

  &[data-orientation="horizontal"] {
    flex-direction: column;
    height: var(--scrollbar-size);
  }
`;

export const ScrollAreaThumb = styled(RadixScrollArea.Thumb)`
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--scrollbar-size);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;

export const ScrollAreaCorner = styled(RadixScrollArea.Corner)`
  background: rgba(0, 0, 0, 0.1);
`;
