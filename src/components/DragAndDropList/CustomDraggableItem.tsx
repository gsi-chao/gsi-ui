import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyledCustomDraggableItem } from './style';

export interface ICDIProps {
  label: string;
  type: string;
}
export const CustomDraggableItem = observer((props: ICDIProps) => {
  const { label, type } = props;
  return (
    <StyledCustomDraggableItem className={'customDraggable'}>
      <label className={'labelName'}>{label}</label>
      <label className={'labelType'}>{type}</label>
    </StyledCustomDraggableItem>
  );
});
