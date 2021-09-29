import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { Rnd } from 'react-rnd';
import { forEach, uniqueId } from 'lodash';
import { DialogStyled } from './styled';

interface IDraggableDialog {
  isOpen: boolean;
  children?: ReactNode;

  onDragStop?(x: number, y: number): void;

  onClose?(): void;
}

const VDraggable = (props: IDraggableDialog): JSX.Element => {
  const [reference, setReference] = useState<number>(11);
  let rnd: any = null;
  const windowsWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName('body')[0].clientWidth;
  const windowsHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight;

  const [position, setPositions] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1
  });
  const [dimension, setDimension] = useState<{
    width: number;
    height: number;
  }>();
  const idDialog: string = useMemo(() => uniqueId(), [dimension]);
  const classNameDialog: string = useMemo(
    () =>
      Math.random()
        .toString(36)
        .substring(7),
    [dimension]
  );

  useEffect(() => {
    const content: any = document.getElementById(idDialog);
    const element: any = content.getElementsByClassName(
      'move-dialog-header'
    )[0];
    if (props.isOpen) {
      if (dimension) {
        rnd.updateSize({ width: dimension.width, height: dimension.height });
      } else {
        setDimension({
          width: element.parentNode.clientWidth,
          height: element.parentNode.clientHeight
        });
      }
    }

    if (props.isOpen && position.x === -1 && position.y === -1) {
      if (dimension) {
        setPositions({
          x: Math.max((windowsWidth - dimension.width) / 2, 0),
          y: Math.max((windowsHeight - dimension.height) / 2, 0)
        });
      }
    }
    onChangeIndex();
  });

  const onChangeIndex = () => {
    if (props.isOpen) {
      const body = document.querySelectorAll('.gsi-div-move-dialog');
      const modal = document.getElementById(idDialog);
      let newIndex = reference;
      forEach(body, m => {
        if (modal !== m) {
          const st = window.getComputedStyle(m);
          newIndex =
            Number(st.zIndex) > newIndex ? Number(st.zIndex) : newIndex;
        }
      });
      if (newIndex !== reference) {
        setReference(newIndex + 1);
      }
    }
  };

  const rectifyPosition = (e: any, d: any) => {
    const pos = { x: d.x, y: d.y };
    setPositions(pos);
  };

  const resetPosition = () => setPositions({ x: -1, y: -1 });

  return (
    <div
      id={idDialog}
      style={{
        top: 0,
        left: 0,
        position: 'fixed',
        zIndex: reference,
        width: '100%',
        height: '100%',
        display: `${!props.isOpen ? 'none' : ''}`,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingBottom: '50px'
      }}
      className={`gsi-div-move-dialog gsi-${classNameDialog}`}
    >
      <Rnd
        ref={(c: any) => {
          rnd = c;
        }}
        enableResizing={{
          bottomLeft: false,
          bottomRight: false,
          topLeft: false,
          topRight: false
        }}
        position={{ ...position }}
        onDragStop={(e: any, d: any) => {
          rectifyPosition(e, d);
        }}
        bounds={'window'}
        onDragStart={() => {
          onChangeIndex();
        }}
        onDrag={(e: any, d: any) => {
          rectifyPosition(e, d);
        }}
        default={{
          ...position,
          width: 'auto',
          height: 'auto'
        }}
        enableUserSelectHack
        dragHandleClassName={`gsi-div-move-dialog.gsi-${classNameDialog} .move-dialog-header`}
      >
        <DialogStyled
          hasBackdrop={false}
          usePortal={false}
          autoFocus={false}
          canOutsideClickClose={false}
          canEscapeKeyClose={false}
          style={{ paddingBottom: '0' }}
          isOpen={props.isOpen}
          children={props.children}
          onClose={props.onClose}
          onClosed={resetPosition}
          transitionDuration={10}
          width={dimension && dimension.width}
          height={dimension && dimension.height}
        />
      </Rnd>
    </div>
  );
};

export const VDraggableDialog = (props: IDraggableDialog): JSX.Element => {
  return ReactDOM.createPortal(<VDraggable {...props} />, document.body);
};
