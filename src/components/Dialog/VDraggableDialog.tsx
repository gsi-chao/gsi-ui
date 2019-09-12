import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { forEach } from 'lodash';
import ReactDOM from 'react-dom';
import { DialogStyled } from './styled';


interface IDraggableDialog {
  width?: string;
  isOpen: boolean;
  children?: ReactNode;

  onDragStop?(x: number, y: number): void;

  onClose?(): void;
}

export const VDraggableDialog = (props: IDraggableDialog): JSX.Element => {
  const [reference, setReference] = useState<number>(9);
  const windowsWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.getElementsByTagName('body')[0].clientWidth;
  const windowsHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.getElementsByTagName('body')[0].clientHeight;


  const [position, setPositions] = useState<{ x: number; y: number }>({ x: -1, y: -1 });

  useEffect(() => {
    onChangeIndex();
  }, []);

  useEffect(() => {
    const element: any = document.getElementsByClassName('move-dialog-header')[0];
    if (props.isOpen) {
      element.style.cursor = 'move';
    } else if (element) {
      element.style.cursor = 'pointer';
    }
  });

  useEffect(() => {
    if (props.isOpen && position.x === -1 && position.y === -1) {
      const element = document.getElementsByClassName('move-dialog-header')[0].parentNode as Element;
      setPositions({
        x: Math.max((windowsWidth - element.clientWidth) / 2, 0),
        y: Math.max((windowsHeight - element.clientHeight) / 2, 0)
      });
    }
  }, [props.children]);

  const onChangeIndex = () => {
    const modals = document.getElementsByClassName('gsi-div-move-dialog');
    let newIndex = reference;
    forEach(modals, m => {
      const st = window.getComputedStyle(m);
      newIndex = Number(st.zIndex) > newIndex ? Number(st.zIndex) : newIndex;
    });
    setReference(newIndex + 1);
  };

  const resetPosition = () => setPositions({ x: -1, y: -1 });

  return (
    <div
      style={{
        top: 0,
        left: 0,
        position: 'fixed',
        zIndex: reference,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        display: `${!props.isOpen ? 'none' : ''}`,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingBottom: '50px',
        overflowY: 'auto'
      }}
      className={'gsi-div-move-dialog'}>
      <Rnd
        enableResizing={{
          bottomLeft: false,
          bottomRight: false,
          topLeft: false,
          topRight: false
        }}
        position={{ ...position }}
        onDragStop={(e: any, d: any) => {
          const pos = { x: d.x, y: d.y };
          setPositions(pos);
        }}
        bounds={'window'}
        onDragStart={() => {
          onChangeIndex();
        }}
        default={{
          ...position,
          width: 'auto',
          height: 'auto'
        }}
        dragHandleClassName={'move-dialog-header'}
      >
        <DialogStyled
          hasBackdrop
          usePortal={false}
          autoFocus
          canOutsideClickClose={false}
          canEscapeKeyClose={false}
          style={{ width: props.width || '85%', paddingBottom: '0' }}
          isOpen={props.isOpen}
          children={props.children}
          onClose={props.onClose}
          onClosed={resetPosition}
        />
      </Rnd>
    </div>
  );
};

