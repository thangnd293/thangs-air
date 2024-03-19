import React, { useCallback, useEffect, useRef } from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { useShallow } from "zustand/react/shallow";

import { App, useDesktopStore } from "@/stores/desktop";
import { takeScreenShot } from "@/utils/function";
import WindowActions from "../WindowActions";
import { ContentWrapper, WindowActionWrapper, WindowContainer } from "./styles";
import useWindowReducer, { WindowActionKind } from "./useWindowReducer";
import {
  addZoomInEffect,
  addZoomOutEffect,
  generateTransition,
  preventAnimate,
  publicAppFullscreen,
  subscribeAppUnMinimized,
  unsubscribeAppUnMinimized,
} from "./utils";
import { WINDOW } from "@/constant";
import {
  subscribeExitFullscreen,
  unsubscribeExitFullscreen,
} from "../Header/utils";

interface WindowProps {
  app: App;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ app, children }) => {
  const { currentApp, openApp, closeApp, minimizeApp } = useDesktopStore(
    useShallow((state) => ({
      currentApp: state.currentAppConnext[0],
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

  const handleExitFullscreen = useCallback(() => {
    dispatch({
      type: WindowActionKind.EXIT_FULLSCREEN,
      payload: {
        prevSize: prevSize.current,
        prevPosition: prevPosition.current,
      },
    });
  }, []);

  const handleFullscreen = () => {
    storePrevSizeAndPosition();
    publicAppFullscreen(app.id);
    dispatch({
      type: WindowActionKind.ENTER_FULLSCREEN,
    });
  };

  useEffect(() => {
    subscribeExitFullscreen(app.id, handleExitFullscreen);

    return () => {
      unsubscribeExitFullscreen(app.id, handleExitFullscreen);
    };
  }, [app.id, handleExitFullscreen]);

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
    const fn = state.isFullScreen ? handleExitFullscreen : handleFullscreen;

    fn();

    const el = rndRef.current?.getSelfElement();

    if (el)
      el.style.transition = generateTransition({
        attrs: ["width", "height", "transform"],
        duration: "0.5s",
      });
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

    minimizeApp(app.id, screenshot);
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
      $isFullscreen={state.isFullScreen}
      position={state.position}
      size={state.size}
      minWidth={WINDOW.MIN_WIDTH}
      minHeight={WINDOW.MIN_HEIGHT}
      disableDragging={state.isFullScreen}
      enableResizing={!state.isFullScreen}
      onMouseDown={onOpenApp}
      onResizeStart={onOpenApp}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onResize={onResize}
    >
      <WindowActionWrapper $isFullscreen={state.isFullScreen}>
        <WindowActions
          onClose={onCloseApp}
          onMinimize={onMinimize}
          onStretch={onToggleFullScreen}
        />
      </WindowActionWrapper>
      <ContentWrapper ref={contentRef} $isFullscreen={state.isFullScreen}>
        {children}
      </ContentWrapper>
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
