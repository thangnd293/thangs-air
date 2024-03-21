import React from "react";
import styled, { css } from "styled-components";

interface AppIconProps {
  name: string;
  shortcut: string;
  isSelected?: boolean;
  onSelect?: () => void;
}
const AppIcon: React.FC<AppIconProps> = ({
  name,
  shortcut,
  isSelected,
  onSelect,
}) => {
  return (
    <AppIconContainer
      data-app-name={name}
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
  position: relative;
  width: 132px;
  height: 132px;
  padding: 18px;
  background: url(${(props) => props.$shortcut}) no-repeat center center;
  border-radius: 8px;
  background-size: contain;
  background-origin: content-box;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: rgba(42, 42, 46, 0.25);
      backdrop-filter: blur(40px);
      cursor: pointer;

      &::before {
        content: attr(data-app-name);
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
      }
    `}
`;
