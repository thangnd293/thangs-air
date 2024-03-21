import React from "react";
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "./styles";

interface ScrollAreaProps {
  children?: React.ReactNode;
}
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children }, ref) => {
    return (
      <ScrollAreaRoot>
        <ScrollAreaViewport ref={ref}>{children}</ScrollAreaViewport>

        <ScrollAreaScrollbar
          orientation="vertical"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>

        <ScrollAreaScrollbar
          orientation="horizontal"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    );
  }
);

export default ScrollArea;
