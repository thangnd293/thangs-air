export type ExitFullscreenEvent = CustomEvent<{
  appID: string;
}>;

export function subscribeExitFullscreen(appID: string, cb: () => void) {
  document.addEventListener(`${appID}-exit-fullscreen`, cb);
}

export function unsubscribeExitFullscreen(appID: string, cb: () => void) {
  document.removeEventListener(`${appID}-exit-fullscreen`, cb);
}

export function publicExitFullscreen(appID: string) {
  const event = new CustomEvent(`${appID}-exit-fullscreen`);

  document.dispatchEvent(event);
}
