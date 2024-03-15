import { useDesktopStore } from "@/stores/desktop";
import { App } from "@components/Providers/DesktopProvider";
import React, { useRef } from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";
import useWindowReducer, { WindowActionKind } from "./useWindowReducer";
import { takeScreenShot } from "@/utils/function";
import { WINDOW } from "@/constant";

interface WindowProps {
  app: App;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ app, children }) => {
  console.log("render", app);
  const { currentApp, openApp, closeApp, collapseApp } = useDesktopStore(
    useShallow((state) => ({
      currentApp: state.currentApp,
      openApp: state.openApp,
      closeApp: state.closeApp,
      collapseApp: state.collapseApp,
    }))
  );

  const [state, dispatch] = useWindowReducer();

  const contentRef = useRef<HTMLDivElement>(null);
  const rndRef = useRef<Rnd>(null);
  const prevSize = useRef(state.size);
  const prevPosition = useRef(state.position);

  const onResize: RndResizeCallback = (_, __, ref, ___, position) => {
    ref.style.transition = "none";
    dispatch({
      type: WindowActionKind.SET_SIZE,
      payload: {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      },
    });
    dispatch({
      type: WindowActionKind.SET_POSITION,
      payload: position,
    });
  };

  const onDragStart: RndDragCallback = (e) => {
    (e.currentTarget as HTMLElement).style.transition = "none";
  };

  const onDragStop: RndDragCallback = (_, d) => {
    dispatch({
      type: WindowActionKind.SET_POSITION,
      payload: d,
    });
  };

  const preventDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      prevPosition.current = state.position;
      prevSize.current = state.size;

      dispatch({
        type: WindowActionKind.ENTER_FULLSCREEN,
      });
    }

    const el = rndRef.current?.getSelfElement();

    if (el)
      el.style.transition =
        "width 0.5s ease 0s, height 0.5s ease 0s, transform 0.5s ease 0s";
  };

  const onCollapse = async () => {
    const shortcut = (await takeScreenShot(contentRef.current!)) || "";

    collapseApp({
      ...app,
      shortcut,
      isCollapsed: true,
    });
  };

  return (
    <Rnd
      ref={rndRef}
      bounds="#desktop"
      style={{
        ...style,
        zIndex: currentApp?.id === app.id ? "1" : "unset",
        display: app.isCollapsed ? "none" : "block",
      }}
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
        <button onClick={onCloseApp} onMouseDown={preventDrag}>
          Close
        </button>
        <button onClick={onCollapse}>Colapse</button>
        <button onClick={onToggleFullScreen} onMouseDown={preventDrag}>
          Toggle fullscreen
        </button>
      </WindowActionWrapper>
      <ContentWrapper ref={contentRef}>{children}</ContentWrapper>
    </Rnd>
  );
};

export default Window;

const style = {
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};

const WindowActionWrapper = styled.div`
  display: flex;
  gap: 4px;
  height: ${WINDOW.HEADER_HEIGHT}px;
  background-color: #f0f0f0;
`;

const ContentWrapper = styled.div`
  height: calc(100% - ${WINDOW.HEADER_HEIGHT}px);
`;
