import { ControlCenterIcon, WifiIcon } from "@/assets/icons";
import React, { useState } from "react";
import { MenuButton } from "../styles";
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/Popover";
import styled from "styled-components";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

const ControlCenter = () => {
  const [isOpenWifi, setIsOpenWifi] = useState(true);

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <MenuButton>
          <ControlCenterIcon width={14} height={14} color="white" />
        </MenuButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContentStyled sideOffset={5}>
          <AnimatePresence>
            {isOpenWifi && (
              <motion.div
                exit={{
                  opacity: 0,
                  width: 0,
                }}
                animate={{
                  opacity: 1,
                  width: 300,
                }}
              >
                <Flex>
                  <Wrapper>
                    <WifiSettings onClick={() => setIsOpenWifi(!isOpenWifi)} />
                  </Wrapper>
                  <Flex $isCol>
                    <Wrapper>Focus</Wrapper>
                    <Wrapper>Manager</Wrapper>
                  </Flex>
                </Flex>
                <Wrapper>Display</Wrapper>
                <Wrapper>Sound</Wrapper>
                <Wrapper>Music</Wrapper>
              </motion.div>
            )}

            {!isOpenWifi && (
              <motion.div
                initial={{
                  opacity: 0,
                  width: 0,
                }}
                animate={{
                  opacity: 1,
                  width: 300,
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                }}
                layout
              >
                <Flex>
                  <Wrapper>
                    <WifiSettings onClick={() => setIsOpenWifi(!isOpenWifi)} />
                  </Wrapper>
                  <Flex $isCol>
                    <Wrapper>cac</Wrapper>
                  </Flex>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
        </PopoverContentStyled>
      </PopoverPortal>
    </PopoverRoot>
  );
};

export default ControlCenter;

const PopoverContentStyled = styled(PopoverContent)`
  width: 300px;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Flex = styled.div<{ $isCol?: boolean }>`
  display: flex;
  width: 100%;
  gap: 10px;

  flex-direction: ${({ $isCol }) => ($isCol ? "column" : "row")};
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: rgba(255, 255, 255, 0.1);
`;

const WifiSettingsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: default;

  & > svg {
    display: none;
  }

  &:hover > svg {
    display: block;
  }
`;

const WifiToggle = styled.button<{ $isOn?: boolean }>`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ $isOn }) =>
    $isOn ? "rgba(255, 255, 255, 0.1)" : "#0a85ff"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.1s;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const WifiLabel = styled.p`
  font-size: 13px;
`;

const WifiName = styled.p`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
`;

interface WifiSettingsProps {
  onClick: () => void;
}
const WifiSettings: React.FC<WifiSettingsProps> = ({ onClick }) => {
  const [isWifiOn, setIsWifiOn] = useState(false);

  return (
    <WifiSettingsContainer onClick={onClick}>
      <WifiToggle $isOn={isWifiOn} onClick={() => setIsWifiOn(!isWifiOn)}>
        <WifiIcon width={18} height={18} />
      </WifiToggle>

      <ContentWrapper>
        <WifiLabel>Wi-Fi</WifiLabel>
        <WifiName>NWVN-E</WifiName>
      </ContentWrapper>
      <ChevronRightIcon />
    </WifiSettingsContainer>
  );
};
