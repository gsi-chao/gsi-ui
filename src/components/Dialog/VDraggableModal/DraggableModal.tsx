import React, { useContext, useEffect, useMemo, useState } from 'react';
import { uniqueId } from 'lodash';

import { DraggableModalContext } from './DraggableModalContext';
import { DraggableModalInner } from './DraggableModalInner';
import { getModalState } from './draggableModalReducer';
import { StyledCardProps } from '../../Card/VCardPanel';
import { IDialogProps } from '@blueprintjs/core';
import { getNumberMatch } from './utils';

// todo add props
export interface DraggableModalProps extends StyledCardProps, IDialogProps {
  isOpen: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  buttonsEndComponent?: any;
  isSaving?: boolean;
  disabled?: boolean;
  enableDrag?: boolean;
  hideEndContainer?: boolean;
  top?: string;
  left?: string;
}

export const VDraggableModal = (
  props: DraggableModalProps
): React.ReactElement => {
  // Get the unique ID of this modal.
  const [id, setId] = useState(uniqueId());

  // Get modal provider.
  const modalProvider = useContext(DraggableModalContext);
  if (!modalProvider) {
    throw new Error('No Provider');
  }
  const { dispatch, state } = modalProvider;

  useEffect(() => {
    setId(uniqueId());
  }, []);

  const modalState = useMemo(() => {
    return getModalState(
      state,
      id,
      getNumberMatch(props.height, 'height'),
      getNumberMatch(props.width, 'width')
    );
  }, [state, props.height, props.width]);
  // We do this so that we don't re-render all modals for every state change.
  // DraggableModalInner uses React.memo, so it only re-renders if
  // if props change (e.g. modalState).
  return (
    <DraggableModalInner
      id={id}
      dispatch={dispatch}
      modalState={modalState}
      {...props}
    />
  );
};
