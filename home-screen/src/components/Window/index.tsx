import { WINDOW } from "@/constant";
import { App, useDesktopStore } from "@/stores/desktop";
import { takeScreenShot } from "@/utils/function";
import React, { useEffect, useRef } from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import styled, { css } from "styled-components";
import { useShallow } from "zustand/react/shallow";
import WindowActions from "./WindowActions";
import useWindowReducer, { WindowActionKind } from "./useWindowReducer";
import {
  addZoomInEffect,
  addZoomOutEffect,
  preventAnimate,
  subscribeAppUnMinimized,
  unsubscribeAppUnMinimized,
} from "./utils";

interface WindowProps {
  app: App;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ app, children }) => {
  const { currentApp, openApp, closeApp, minimizeApp } = useDesktopStore(
    useShallow((state) => ({
      currentApp: state.currentApp,
      openApp: state.openApp,
      closeApp: state.closeApp,
      minimizeApp: state.minimizeApp,
    }))
  );

  const [state, dispatch] = useWindowReducer();

  const contentRef = useRef<HTMLDivElement>(null);
  const rndRef = useRef<Rnd>(null);
  const prevSize = useRef(state.size);
  const prevPosition = useRef(state.position);

  useListenUnMinimized(app, rndRef);

  const onResize: RndResizeCallback = (_, __, ref, ___, position) => {
    preventAnimate(ref);

    dispatch({
      type: WindowActionKind.SET_SIZE_AND_POSITION,
      payload: {
        size: {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        },
        position: {
          x: position.x,
          y: position.y,
        },
      },
    });
  };

  const onDragStart: RndDragCallback = (e) => {
    preventAnimate(e.currentTarget as HTMLElement);
  };

  const onDragStop: RndDragCallback = (_, d) => {
    dispatch({
      type: WindowActionKind.SET_POSITION,
      payload: d,
    });
  };

  const onCloseApp = closeApp.bind(null, app.id);

  const onOpenApp = openApp.bind(null, app.id);

  const onToggleFullScreen = () => {
    if (state.isFullScreen) {
      dispatch({
        type: WindowActionKind.EXIT_FULLSCREEN,
        payload: {
          prevSize: prevSize.current,
          prevPosition: prevPosition.current,
        },
      });
    } else {
      storePrevSizeAndPosition();
      dispatch({
        type: WindowActionKind.ENTER_FULLSCREEN,
      });
    }

    const el = rndRef.current?.getSelfElement();

    if (el)
      el.style.transition =
        "width 0.5s ease 0s, height 0.5s ease 0s, transform 0.5s ease 0s";
  };

  const onMinimize = () => {
    const dockEl = document.getElementById("dock");

    const el = rndRef.current?.getSelfElement();

    if (!el || !dockEl) {
      console.error("onMinimize: dockEl or el is not found");
      return;
    }

    storePrevSizeAndPosition();

    const screenshot = takeScreenShot(contentRef.current!, {
      allowTaint: true,
      useCORS: true,
      scale: 0.5,
      logging: false,
    });

    addZoomInEffect(el, dockEl);

    minimizeApp({
      ...app,
      isMinimized: true,
      screenshot,
    });
  };

  function storePrevSizeAndPosition() {
    prevPosition.current = state.position;
    prevSize.current = state.size;
  }

  return (
    <WindowContainer
      ref={rndRef}
      bounds="#desktop"
      $isFocus={currentApp?.id === app.id}
      position={state.position}
      size={state.size}
      minWidth={320}
      minHeight={200}
      onMouseDown={onOpenApp}
      onResizeStart={onOpenApp}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onResize={onResize}
    >
      <WindowActionWrapper>
        <WindowActions
          onClose={onCloseApp}
          onMinimize={onMinimize}
          onStretch={onToggleFullScreen}
        />
      </WindowActionWrapper>
      <ContentWrapper ref={contentRef}>{children}</ContentWrapper>
    </WindowContainer>
  );
};

export default Window;

const useListenUnMinimized = (
  app: App,
  rndRef: React.MutableRefObject<Rnd>
) => {
  useEffect(() => {
    const handleUnMinimized = () => {
      const el = rndRef.current.getSelfElement();
      if (el) addZoomOutEffect(el);
    };

    subscribeAppUnMinimized(app, handleUnMinimized);

    return () => {
      unsubscribeAppUnMinimized(app, handleUnMinimized);
    };
  }, [app.id]);
};

const WindowContainer = styled(Rnd)<{ $isFocus: boolean }>`
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 10px 30px 2px;
  z-index: ${(props) => (props.$isFocus ? 1 : 0)};

  ${(props) =>
    props.$isFocus &&
    css`
      z-index: "1";
      box-shadow: rgba(0, 0, 0, 0.65) 0px 10px 30px 2px;
      border-color: rgba(255, 255, 255, 0.4);
    `}
`;

const WindowActionWrapper = styled.div`
  display: flex;
  gap: 4px;
  height: ${WINDOW.HEADER_HEIGHT}px;
  background-color: #f0f0f0;
`;

const ContentWrapper = styled.div`
  height: calc(100% - ${WINDOW.HEADER_HEIGHT}px);
  overflow: auto;
  background-color: palegoldenrod;
  container-type: inline-size;
`;
