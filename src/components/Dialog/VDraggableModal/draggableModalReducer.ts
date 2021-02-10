import { clamp, getWindowSize } from './utils';

const mapObject = <T>(
  o: { [key: string]: T },
  f: (value: T) => T
): { [key: string]: T } =>
  Object.assign({}, ...Object.keys(o).map(k => ({ [k]: f(o[k]) })));

// ID for a specific modal.
export type ModalID = string;

// State for a specific modal.
export interface ModalState {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  visible: boolean;
}

// State of all modals.
export interface ModalsState {
  maxZIndex: number;
  windowSize: {
    width: number;
    height: number;
  };
  modals: {
    [key: string]: ModalState;
  };
}

export const initialModalsState: ModalsState = {
  maxZIndex: 0,
  windowSize: getWindowSize(),
  modals: {}
};

export const initialModalState = (
  height?: number,
  width?: number
): ModalState => {
  return {
    x: 0,
    y: 0,
    width: width ? width : 600,
    height: height ? height : 600,
    zIndex: 11,
    visible: false
  };
};

export type Action =
  | { type: 'show'; id: ModalID }
  | { type: 'hide'; id: ModalID }
  | { type: 'focus'; id: ModalID }
  | { type: 'unmount'; id: ModalID }
  | { type: 'mount'; id: ModalID; size: { width: number; height: number } }
  | { type: 'windowResize'; size: { width: number; height: number } }
  | { type: 'drag'; id: ModalID; x: number; y: number }
  | {
      type: 'resize';
      id: ModalID;
      x: number;
      y: number;
      width: number;
      height: number;
    };

export const getModalState = (
  state: ModalsState,
  id: ModalID,
  height?: number,
  width?: number
): ModalState => {
  return state.modals[id] || initialModalState(height, width);
};

const getNextZIndex = (state: ModalsState, id: string): number =>
  getModalState(state, id).zIndex === state.maxZIndex
    ? state.maxZIndex
    : state.maxZIndex + 1;

const clampDrag = (
  windowWidth: number,
  windowHeight: number,
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } => {
  const maxX = windowWidth - width;
  const maxY = windowHeight - height;
  const clampedX = clamp(0, maxX, x);
  const clampedY = clamp(0, maxY, y);
  return { x: clampedX, y: clampedY };
};

const clampResize = (
  windowWidth: number,
  windowHeight: number,
  x: number,
  y: number,
  width: number,
  height: number
): { width: number; height: number } => {
  const maxWidth = windowWidth - x;
  const maxHeight = windowHeight - y;
  const clampedWidth = clamp(0, maxWidth, width);
  const clampedHeight = clamp(0, maxHeight, height);
  return { width: clampedWidth, height: clampedHeight };
};

export const draggableModalReducer = (
  state: ModalsState,
  action: Action
): ModalsState => {
  const windowSize = getWindowSize();
  switch (action.type) {
    case 'resize':
      const size = clampResize(
        windowSize.width,
        windowSize.height,
        action.x,
        action.y,
        action.width,
        action.height
      );
      return {
        ...state,
        maxZIndex: getNextZIndex(state, action.id),
        modals: {
          ...state.modals,
          [action.id]: {
            ...state.modals[action.id],
            ...size,
            zIndex: getNextZIndex(state, action.id)
          }
        }
      };
    case 'drag':
      return {
        ...state,
        maxZIndex: getNextZIndex(state, action.id),
        modals: {
          ...state.modals,
          [action.id]: {
            ...state.modals[action.id],
            ...clampDrag(
              windowSize.width,
              windowSize.height,
              action.x,
              action.y,
              state.modals[action.id].width,
              state.modals[action.id].height
            ),
            zIndex: getNextZIndex(state, action.id)
          }
        }
      };
    case 'show': {
      const modalState = state.modals[action.id];
      const centerX = windowSize.width / 2 - modalState.width / 2;
      const centerY = windowSize.height / 2 - modalState.height / 2;
      const position = clampDrag(
        windowSize.width,
        windowSize.height,
        centerX,
        centerY,
        modalState.width,
        modalState.height
      );
      const size = clampResize(
        windowSize.width,
        windowSize.height,
        position.x,
        position.y,
        modalState.width,
        modalState.height
      );
      return {
        ...state,
        maxZIndex: state.maxZIndex + 1,
        modals: {
          ...state.modals,
          [action.id]: {
            ...modalState,
            ...position,
            ...size,
            zIndex: state.maxZIndex + 1,
            visible: true
          }
        }
      };
    }
    case 'focus':
      const modalState = state.modals[action.id];
      return {
        ...state,
        maxZIndex: state.maxZIndex + 1,
        modals: {
          ...state.modals,
          [action.id]: {
            ...modalState,
            zIndex: state.maxZIndex + 1
          }
        }
      };
    case 'hide': {
      const modalState = state.modals[action.id];
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.id]: {
            ...modalState,
            visible: false
          }
        }
      };
    }
    case 'mount':
      const width = action.size.width ? action.size.width : 600;
      const height = action.size.height ? action.size.height : 600;
      return {
        ...state,
        maxZIndex: state.maxZIndex + 1,
        modals: {
          ...state.modals,
          [action.id]: {
            width,
            height,
            visible: false,
            x: (windowSize.width - width) / 2,
            y: (windowSize.height - height) / 2,
            zIndex: state.maxZIndex + 1
          }
        }
      };
    case 'unmount':
      const modalsClone = { ...state.modals };
      delete modalsClone[action.id];
      return {
        ...state,
        modals: modalsClone
      };
    case 'windowResize':
      return {
        ...state,
        windowSize,
        modals: mapObject(state.modals, (modalState: ModalState) => {
          const position = {
            x: (windowSize.width - modalState.width) / 2,
            y: (windowSize.height - modalState.height) / 2
          };

          const size = clampResize(
            windowSize.width,
            windowSize.height,
            position.x,
            position.y,
            modalState.width,
            modalState.height
          );
          return {
            ...modalState,
            ...position,
            ...size
          };
        })
      };
    default:
      throw new Error();
  }
};
