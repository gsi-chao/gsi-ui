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
  onItemSelected?: (item: any) => void;
}
