import { CustomDraggableItem } from './CustomDraggableItem';
import React from 'react';
import { DNDItem } from './style';
import { DraggableProvided } from 'react-beautiful-dnd';
import { IDNDItem, IDNDList, SelectedItemHelpButtonList } from './types';
import { useClickPreventionOnDoubleClick } from '../CustomHooks';

export interface DNDItemWrapperProps {
  onClick: any;
  onDoubleClick: any;
  className: string;
  providedDraggable: DraggableProvided;
  item: IDNDItem;
  handleHelpButtonClicked?: (
    itemId: any,
    source: any,
    destination: any
  ) => void;
  displayButtons?: boolean;
  selectedItemHelpButtons?: SelectedItemHelpButtonList;
  value: IDNDList;
  innerRef: any;
}

export const DNDItemWrapper = (props: DNDItemWrapperProps) => {
  const {
    onClick,
    onDoubleClick,
    className,
    providedDraggable,
    item,
    handleHelpButtonClicked,
    displayButtons,
    value,
    selectedItemHelpButtons
  } = props;
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    onClick,
    onDoubleClick
  );
  return (
    <DNDItem
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={className}
      ref={props.innerRef}
      {...providedDraggable.draggableProps}
      {...providedDraggable.dragHandleProps}
    >
      <CustomDraggableItem
        label={item.label}
        type={item.type || ''}
        source={value.id}
        displayButtons={displayButtons}
        selectedItemHelpButtons={selectedItemHelpButtons}
        draggableId={item.value}
        handleHelpButtonClicked={handleHelpButtonClicked}
      />
      {providedDraggable.placeholder}
    </DNDItem>
  );
};
