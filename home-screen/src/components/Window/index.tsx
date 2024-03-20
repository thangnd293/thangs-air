import React, { useEffect, useRef } from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { useShallow } from "zustand/react/shallow";

import { WINDOW } from "@/constant";
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
  subscribeAppUnMinimized,
  unsubscribeAppUnMinimized,
} from "./utils";

interface WindowProps {
  app: App;
  stackIndex: number;
  isFocus?: boolean;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  app,
  stackIndex,
  isFocus,
  children,
}) => {
  const { openApp, closeApp, minimizeApp, openFullscreen, exitFullscreen } =
    useDesktopStore(
      useShallow((state) => ({
        openApp: state.openApp,
        closeApp: state.closeApp,
        minimizeApp: state.minimizeApp,
        openFullscreen: state.openFullscreen,
        exitFullscreen: state.exitFullscreen,
      }))
    );

  const [state, dispatch] = useWindowReducer();

  const contentRef = useRef<HTMLDivElement>(null);
  const rndRef = useRef<Rnd>(null);
  const prevSize = useRef(state.size);
  const prevPosition = useRef(state.position);

  useListenUnMinimized(app, rndRef);

  // Restore the previous size and position when the app exits fullscreen
  useEffect(() => {
    if (!app.isFullscreen) {
      dispatch({
        type: WindowActionKind.EXIT_FULLSCREEN,
        payload: {
          prevSize: prevSize.current,
          prevPosition: prevPosition.current,
        },
      });
      exitFullscreen(app.id);
    }
  }, [app.isFullscreen, app.id]);

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

  const onFullScreen = () => {
    storePrevSizeAndPosition();
    dispatch({
      type: WindowActionKind.ENTER_FULLSCREEN,
    });
    openFullscreen(app.id);

    const el = rndRef.current?.getSelfElement();

    if (!el) return;

    el.style.transition = generateTransition({
      attrs: ["width", "height", "transform"],
      duration: "0.5s",
    });
  };

  const onMinimize = () => {
    const dockEl = document.getElementById("dock");

    const el = rndRef.current?.getSelfElement();

    if (!el || !dockEl) {
      return console.error("onMinimize: dockEl or el is not found");
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
      $isFocus={isFocus}
      $stackIndex={stackIndex}
      $isFullscreen={app.isFullscreen}
      ref={rndRef}
      bounds="#desktop"
      position={state.position}
      size={state.size}
      minWidth={WINDOW.MIN_WIDTH}
      minHeight={WINDOW.MIN_HEIGHT}
      disableDragging={app.isFullscreen}
      enableResizing={!app.isFullscreen}
      onMouseDown={onOpenApp}
      onResizeStart={onOpenApp}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onResize={onResize}
    >
      <WindowActionWrapper $isFullscreen={app.isFullscreen}>
        <WindowActions
          onClose={onCloseApp}
          onMinimize={onMinimize}
          onStretch={onFullScreen}
        />
      </WindowActionWrapper>
      <ContentWrapper ref={contentRef} $isFullscreen={app.isFullscreen}>
        {children}
      </ContentWrapper>
    </WindowContainer>
  );
};

export default React.memo(Window);

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
