import styled from "styled-components";

export const MenuButton = styled.button`
  height: 24px;
  padding: 4px 14px;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: white;
  font-size: 13px;

  &[data-state="open"] {
    background-color: #f5f5f53b;
  }
`;
