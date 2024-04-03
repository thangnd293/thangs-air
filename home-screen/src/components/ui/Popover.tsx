import * as Popover from "@radix-ui/react-popover";
import styled from "styled-components";

const PopoverRoot = Popover.Root;
const PopoverTrigger = Popover.Trigger;
const PopoverPortal = Popover.Portal;
const PopoverContent = styled(Popover.Content)`
  min-width: 220px;
  color: white;
  background-color: rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(100px);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 10px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent };
