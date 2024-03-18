import {
  AppFullscreenEvent,
  publicAppFullscreen,
  subscribeAppFullscreen,
  unsubscribeAppFullscreen,
} from "@/components/Window/utils";
import { useCallback, useEffect, useState } from "react";

export function useCurrentFullscreenApp() {
  const [appFullscreen, setAppFullscreen] = useState("");

  useEffect(() => {
    const handleAppFullscreen = (e: AppFullscreenEvent) =>
      setAppFullscreen(e.detail.appID);

    subscribeAppFullscreen(handleAppFullscreen);

    return () => {
      unsubscribeAppFullscreen(handleAppFullscreen);
    };
  }, []);

  const exitFullscreen = useCallback(() => {
    publicAppFullscreen("");
    setAppFullscreen("");
  }, []);

  return {
    isFullscreen: !!appFullscreen,
    appFullscreen,
    exitFullscreen,
  } as const;
}
