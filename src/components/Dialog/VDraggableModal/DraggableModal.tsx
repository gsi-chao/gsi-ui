import React, { useContext, useEffect, useState } from 'react';
import { uniqueId } from 'lodash';

import { DraggableModalContext } from './DraggableModalContext';
import { DraggableModalInner } from './DraggableModalInner';
import { getModalState } from './draggableModalReducer';
import './DraggableModal.css';
import { StyledCardProps } from '../../Card/VCardPanel';

// todo add props
export interface DraggableModalProps extends StyledCardProps {
  isOpen: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  buttonsEndComponent?: any;
  isSaving?: boolean;
  disabled?: boolean;
  enableDrag?: boolean;
}

export const DraggableModal = (
  props: DraggableModalProps
): React.ReactElement => {
  // Get the unique ID of this modal.
  const [id, setId] = useState(uniqueId());

  useEffect(() => {
    setId(uniqueId());
  }, []);

  // Get modal provider.
  const modalProvider = useContext(DraggableModalContext);
  if (!modalProvider) {
    throw new Error('No Provider');
  }

  const { dispatch, state } = modalProvider;
  const modalState = getModalState(state, id);

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
