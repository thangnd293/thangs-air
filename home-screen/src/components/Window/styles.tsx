import { WINDOW } from "@/constant";
import { Rnd } from "react-rnd";
import styled, { css } from "styled-components";

export const WindowContainer = styled(Rnd)<{
  $isFocus: boolean;
  $isFullscreen: boolean;
}>`
  overflow: hidden;

  box-shadow: rgba(0, 0, 0, 0.45) 0px 10px 30px 2px;

  z-index: ${({ $isFocus }) => ($isFocus ? 1 : 0)};

  border: ${({ $isFullscreen }) =>
    $isFullscreen ? "none" : "1px solid rgba(255, 255, 255, 0.3)"};
  border-radius: ${({ $isFullscreen }) => ($isFullscreen ? "unset" : "10px")};
  margin-top: ${({ $isFullscreen }) => ($isFullscreen ? "-24px" : "0")};
  ${({ $isFocus }) =>
    $isFocus &&
    css`
      z-index: "1";
      box-shadow: rgba(0, 0, 0, 0.65) 0px 10px 30px 2px;
      border-color: rgba(255, 255, 255, 0.4);
    `}
`;

export const WindowActionWrapper = styled.div<{
  $isFullscreen: boolean;
}>`
  display: ${({ $isFullscreen }) => ($isFullscreen ? "none" : "flex")};
  gap: 4px;
  height: ${WINDOW.HEADER_HEIGHT}px;
  background-color: #f0f0f0;
`;

export const ContentWrapper = styled.div<{
  $isFullscreen: boolean;
}>`
  height: ${({ $isFullscreen }) =>
    $isFullscreen ? "100%" : `calc(100% - ${WINDOW.HEADER_HEIGHT}px)`};
  overflow: auto;
  background-color: palegoldenrod;
  container-type: inline-size;
`;
