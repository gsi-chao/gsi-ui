import { IconName, Intent, MaybeElement } from '@blueprintjs/core';

export interface IDNDItem {
  value: string;
  label: string;
  type?: string;
}

export interface IDNDList {
  id: string;
  label?: string;
  list: IDNDItem[];
  allowFilter?: boolean;
  width?: string;
  height?: string;
  headerColor?: string;
  headerBackgroundColor?: string;
  loading?: boolean;
}

export interface Item {
  id: string;
  content: string;
}
export interface IDragAndDropListState {
  items: IDNDList[];
  filterValues: any;
  draggableId: string;
  selectedItemId: any;
  draggableItemSourceId: string;
}

export interface ISourceDestination {
  droppableId: string;
  index: number;
}

export interface IOnDragAndDropResponse {
  list: IDNDList[];
  source: ISourceDestination;
  destination: ISourceDestination;
  draggableId: string;
}

export interface IDragAndDropListProps {
  containerOrientation?: 'horizontal' | 'vertical';
  list: IDNDList[];
  onDragAndDrop?: (response: IOnDragAndDropResponse) => void;
  allowItemSelection?: boolean;
  onItemSelected?: (item: any, listId: any) => void;
  onDoubleClickItem?: (item: any, listId: any) => void;
  selectedItemHelpButtons?: SelectedItemHelpButtonList;
  onHelpButtonClicked?: (itemId: any, source: any, destination: any) => void;
  showHelpButtons?: boolean;
  sourceListBackGroundColor?: string;
}

export interface SelectedItemHelpButtonList {
  buttons: SelectedItemHelpButton[];
}

export interface SelectedItemHelpButton {
  text?: string;
  intent?: Intent;
  destinationId: string;
  icon?: IconName | MaybeElement;
  tooltip?: string;
}
