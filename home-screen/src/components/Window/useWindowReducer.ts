import { WINDOW } from "@/constant";
import { useReducer } from "react";
import { Props } from "react-rnd";

export enum WindowActionKind {
  SET_SIZE,
  SET_POSITION,
  EXIT_FULLSCREEN,
  ENTER_FULLSCREEN,
}

interface WindowState {
  size: Props["size"];
  position: Props["position"];
  isFullScreen: boolean;
}

type WindowActions =
  | {
      type: WindowActionKind.SET_SIZE;
      payload: Props["size"];
    }
  | {
      type: WindowActionKind.SET_POSITION;
      payload: Props["position"];
    }
  | {
      type: WindowActionKind.EXIT_FULLSCREEN;
      payload: {
        prevSize: Props["size"];
        prevPosition: Props["position"];
      };
    }
  | {
      type: WindowActionKind.ENTER_FULLSCREEN;
    };

function reducer(state: WindowState, action: WindowActions): WindowState {
  switch (action.type) {
    case WindowActionKind.SET_SIZE:
      return {
        ...state,
        size: {
          width: action.payload.width,
          height: action.payload.height,
        },
      };

    case WindowActionKind.SET_POSITION:
      return {
        ...state,
        position: {
          x: action.payload.x,
          y: action.payload.y,
        },
      };

    case WindowActionKind.EXIT_FULLSCREEN:
      return {
        ...state,
        isFullScreen: false,
        size: action.payload.prevSize,
        position: action.payload.prevPosition,
      };

    case WindowActionKind.ENTER_FULLSCREEN:
      return {
        ...state,
        isFullScreen: true,
        size: {
          width: "100%",
          height: "100%",
        },
        position: {
          x: 0,
          y: 0,
        },
      };
    default:
      return state;
  }
}

export default function useWindowReducer() {
  return useReducer(reducer, {
    size: WINDOW.DEFAULT_SIZE,
    position: {
      x: window.innerWidth / 2 - WINDOW.DEFAULT_SIZE.width / 2,
      y: window.innerHeight / 2 - WINDOW.DEFAULT_SIZE.height / 2,
    },
    isFullScreen: false,
  });
}
