import { WINDOW } from "@/constant";
import { App } from "@/stores/desktop";
import React from "react";

export function preventAnimate(el: HTMLElement) {
  el.style.transition = "none";
}

export function preventDrag(e: React.MouseEvent) {
  e.stopPropagation();
}

export function addZoomInEffect(el: HTMLElement, dockEl: HTMLElement) {
  const elClientRect = el.getBoundingClientRect();
  const dockClientRect = dockEl.getBoundingClientRect();

  el.style.transition = generateTransition({
    ats: ["width", "height", "transform", "opacity", "left", "top"],
    duration: "0.6s",
  });

  el.style.transform = el.style.transform + WINDOW.SCALE_MINIMIZE;
  el.style.minWidth = "0px";
  el.style.minHeight = "0px";
  el.style.opacity = "0";

  // Align the element to the dock
  const left =
    dockClientRect.x +
    dockClientRect.width -
    elClientRect.x -
    elClientRect.width / 2;
  const top = dockClientRect.y - elClientRect.y - elClientRect.height / 2;

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

export function addZoomOutEffect(el: HTMLElement) {
  el.style.transition = generateTransition({
    ats: ["width", "height", "transform", "opacity", "left", "top"],
    duration: "0.6s",
  });

  const detectTranslate = /translate\(\d*\.?\d*px, \d*\.?\d*px\)/;

  el.style.transform = detectTranslate.exec(el.style.transform)[0];
  el.style.minWidth = `${WINDOW.MIN_WIDTH}px`;
  el.style.minHeight = `${WINDOW.MIN_HEIGHT}px`;
  el.style.left = "0px";
  el.style.top = "0px";
  el.style.opacity = "1";
}

export function subscribeAppUnCollapsed(app: App, cb: () => void) {
  document.addEventListener(`${app.id}-unCollapsed`, cb);
}

export function unsubscribeAppUnCollapsed(app: App, cb: () => void) {
  document.removeEventListener(`${app.id}-unCollapsed`, cb);
}

export function publicAppUnCollapsed(app: App) {
  const event = new CustomEvent(`${app.id}-unCollapsed`);

  document.dispatchEvent(event);
}

function generateTransition(options: { ats: string[]; duration: string }) {
  const { ats, duration } = options;
  return ats.map((at) => `${at} ${duration} ease 0s`).join(", ");
}
