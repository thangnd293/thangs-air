import React from "react";
import styled from "styled-components";
import { CloseIcon, MinimizeIcon, StretchIcon } from "@/assets/icons";

interface WindowActionsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onStretch?: () => void;
}

const WindowActions: React.FC<WindowActionsProps> = ({
  onClose,
  onMinimize,
  onStretch,
}) => {
  return (
    <WindowActionsContainer>
      <CloseButton
        disabled={!onClose}
        onClick={onClose}
        onMouseDown={preventDrag}
      >
        <CloseIcon color="#911f17" width={7} height={7} />
      </CloseButton>
      <MinimizeButton
        disabled={!onMinimize}
        onClick={onMinimize}
        onMouseDown={preventDrag}
      >
        <MinimizeIcon color="#A97229" />
      </MinimizeButton>
      <StretchButton
        disabled={!onStretch}
        onClick={onStretch}
        onMouseDown={preventDrag}
      >
        <StretchIcon color="#286017" />
      </StretchButton>
    </WindowActionsContainer>
  );
};

export default WindowActions;

function preventDrag(e: React.MouseEvent) {
  e.stopPropagation();
}

const WindowActionsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 7px;

  & svg {
    display: none;
  }

  &:hover svg {
    display: block;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }
`;

const CloseButton = styled(Button)`
  background-color: #ed6a5e;

  &:active {
    background-color: #ef9389;
  }
`;

const MinimizeButton = styled(Button)`
  background-color: #f5bf4f;

  &:active {
    background-color: #fcea74;
  }
`;

const StretchButton = styled(Button)`
  background-color: #61c554;

  &:active {
    background-color: #86f27e;
  }
`;
