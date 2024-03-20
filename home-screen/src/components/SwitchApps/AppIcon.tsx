import React from "react";
import styled from "styled-components";

interface AppIconProps {
  shortcut: string;
  isSelected?: boolean;
  onSelect?: () => void;
}
const AppIcon: React.FC<AppIconProps> = ({
  shortcut,
  isSelected,
  onSelect,
}) => {
  return (
    <AppIconContainer
      $shortcut={shortcut}
      $isSelected={isSelected}
      onMouseOver={onSelect}
    />
  );
};

export default AppIcon;

const AppIconContainer = styled.div<{
  $shortcut: string;
  $isSelected: boolean;
}>`
  width: 64px;
  height: 64px;
  background: url(${(props) => props.$shortcut}) no-repeat center center;
  border-radius: 10px;
  border: ${({ $isSelected }) => ($isSelected ? "1px solid red" : "unset")};
  background-size: contain;
`;
