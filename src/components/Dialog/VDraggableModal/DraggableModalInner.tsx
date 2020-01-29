import React, { useEffect, useMemo, useCallback, memo } from 'react';

import { AnchorButton, Dialog } from '@blueprintjs/core';
import { ResizeHandle } from './ResizeHandle';
import { useDrag } from './useDrag';
import { DraggableModalContextMethods } from './DraggableModalContext';
import { usePrevious } from './usePrevious';
import { ModalID, ModalState } from './draggableModalReducer';
import { useResize } from './useResize';
import { VCardPanel } from '../../Card';
import {
  DialogBodyContainer,
  DialogButtonsEndsContainers,
  DialogDS
} from './dialog';
import { VSpinner } from '../../Spinner';
import './dialog.css';
import { getNumberMatch } from './utils';

const modalStyle: React.CSSProperties = {
  margin: 0,
  paddingBottom: 0,
  pointerEvents: 'auto',
  position: 'relative'
};

interface ContextProps extends DraggableModalContextMethods {
  id: ModalID;
  modalState: ModalState;
}

// todo add props
export type DraggableModalInnerProps = any & {
  children?: React.ReactNode;
} & ContextProps;

export const DraggableModalInner = memo(
  ({
    id,
    modalState,
    dispatch,
    isOpen,
    children,
    buttonsEndComponent,
    disabled,
    isSaving,
    onSave,
    onCancel,
    saveText,
    cancelText,
    enableDrag,
    hideEndContainer,
    ...modalProps
  }: DraggableModalInnerProps) => {
    // Call on mount and unmount.
    useEffect(() => {
      const size = {
        height: getNumberMatch(modalProps.height, 'height'),
        width: getNumberMatch(modalProps.width, 'width')
      };
      dispatch({
        id,
        size,
        type: 'mount'
      });
      return () => dispatch({ type: 'unmount', id });
    }, [dispatch, id]);

    useEffect(() => {
      const size = {
        height: getNumberMatch(modalProps.height, 'height'),
        width: getNumberMatch(modalProps.width, 'width')
      };
      dispatch({
        id,
        size,
        type: 'mount'
      });
    }, [modalProps.height, modalProps.width]);

    // Bring this to the front if it's been opened with props.
    const visiblePrevious = usePrevious(isOpen);
    useEffect(() => {
      if (isOpen !== visiblePrevious) {
        if (isOpen) {
          dispatch({ type: 'show', id });
        } else {
          dispatch({ type: 'hide', id });
        }
      }
    }, [isOpen, visiblePrevious, id, dispatch]);

    const { zIndex, x, y, width, height } = modalState;

    const style: React.CSSProperties = useMemo(
      () => ({
        ...modalStyle,
        zIndex,
        top: y,
        left: x,
        height: modalProps.hasOwnProperty('height')
          ? modalProps.height
          : modalState.height,
        width: modalProps.hasOwnProperty('width')
          ? modalProps.width
          : modalState.width
      }),
      [y, x, height, width, zIndex]
    );

    const onFocus = useCallback(() => dispatch({ type: 'focus', id }), [
      id,
      dispatch
    ]);

    const onDragWithID = useCallback(
      args => dispatch({ type: 'drag', id, ...args }),
      [dispatch, id]
    );

    const onResizeWithID = useCallback(
      args => dispatch({ type: 'resize', id, ...args }),
      [dispatch, id]
    );

    const onMouseDrag = useDrag(x, y, onDragWithID);
    const onMouseResize = useResize(x, y, width, height, onResizeWithID);

    return (
      <DialogDS
        portalClassName={'gsi-draggable-modal'}
        style={style}
        canEscapeKeyClose={false}
        hasBackdrop={true}
        canOutsideClickClose={false}
        isOpen={isOpen}
        autoFocus={true}
        enforceFocus={false}
      >
        <VCardPanel
          {...modalProps}
          height={
            modalProps.hasOwnProperty('height')
              ? modalProps.height
              : `${modalState.height}px`
          }
          width={
            modalProps.hasOwnProperty('width')
              ? modalProps.width
              : `${modalState.width}px`
          }
          onHeaderFocus={onFocus}
          onHeaderMouseDrag={onMouseDrag}
          bodyPadding={'0px'}
        >
          <DialogBodyContainer buttonHeight={hideEndContainer ? '0px' : '45px'}>
            {children}
          </DialogBodyContainer>
          {!hideEndContainer && (
            <DialogButtonsEndsContainers>
              {buttonsEndComponent ? (
                buttonsEndComponent
              ) : isSaving ? (
                <VSpinner size={24} />
              ) : (
                <>
                  <AnchorButton
                    minimal
                    icon={'tick'}
                    disabled={disabled}
                    text={saveText ? saveText : 'Save'}
                    onClick={onSave}
                    intent={'success'}
                  />
                  <AnchorButton
                    minimal
                    icon={'disable'}
                    text={cancelText ? cancelText : 'Cancel'}
                    onClick={onCancel}
                    intent={'danger'}
                  />
                </>
              )}
            </DialogButtonsEndsContainers>
          )}
        </VCardPanel>
        {enableDrag && <ResizeHandle onMouseDown={onMouseResize} />}
      </DialogDS>
    );
  }
);

DraggableModalInner.displayName = 'DraggableModalInner';
