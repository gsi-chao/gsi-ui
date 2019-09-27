import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyledCustomDraggableItem } from './style';
import { SelectedItemHelpButton, SelectedItemHelpButtonList } from './types';
import { Button } from '@blueprintjs/core';
import { CustomDraggableItemHelpButtons } from './CustomDraggableItemHelpButtons';

export interface ICDIProps {
  label: string;
  type: string;
  displayButtons?: boolean;
  source?: string;
  selectedItemHelpButtons?: SelectedItemHelpButtonList;
  draggableId: string;
  handleHelpButtonClicked?: (
    itemId: any,
    source: any,
    destination: any
  ) => void;
}
export const CustomDraggableItem = observer((props: ICDIProps) => {
  const {
    label,
    type,
    displayButtons,
    selectedItemHelpButtons,
    source,
    draggableId,
    handleHelpButtonClicked
  } = props;
  return (
    <StyledCustomDraggableItem className={'customDraggable'}>
      <div className={'labelsContainer'}>
        <label className={'labelName'}>{label}</label>
        <label className={'labelType'}>{type}</label>
      </div>
      <CustomDraggableItemHelpButtons
        selectedItemHelpButtons={selectedItemHelpButtons}
        draggableId={draggableId}
        displayButtons={displayButtons}
        handleHelpButtonClicked={handleHelpButtonClicked}
        source={source}
      />
    </StyledCustomDraggableItem>
  );
});
