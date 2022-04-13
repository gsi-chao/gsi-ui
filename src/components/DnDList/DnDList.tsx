import React, {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useState
} from 'react';
import {
  DragDropContext as WDragDropContext,
  Draggable as WDraggable,
  Droppable as WDroppable,
  DropResult
} from 'react-beautiful-dnd';
import { DNDItem, DnDListContainer } from './style';

const DragDropContext: PropsWithChildren<any> = WDragDropContext;
const Draggable: PropsWithChildren<any> = WDraggable;
const Droppable: PropsWithChildren<any> = WDroppable;
interface Item {
  id: string;
  content: React.ReactNode;
}

interface IProps {
  innerPadding?: number;
  width?: string;
  height?: string;
  paddingList?: string;
  marginList?: string;
  paddingItem?: string;
  marginItem?: string;
  backgroundColor?: string;
  dragColor?: string;
  direction: 'horizontal' | 'vertical';
  list: Item[];
  onDragAndDrop?: (list: Item[]) => void;
}

const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */

export const DnDList = (props: IProps) => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    setItems(props.list);
  }, [props.list]);

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itm = reorder(items, result.source.index, result.destination.index);

    setItems(itm);
    if (props.onDragAndDrop) {
      props.onDragAndDrop(itm);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction={props.direction}>
        {(provided: any, snapshot: any) => (
          <DnDListContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            direction={props.direction}
            isDragging={snapshot.isDraggingOver}
            dragColor={props.dragColor}
            background={props.backgroundColor}
            margin={props.marginList}
            padding={props.paddingList}
            width={props.width}
            height={props.height}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any) => (
                  <DNDItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    margin={props.marginItem}
                    padding={props.paddingItem}
                    draggableStyle={provided.draggableProps.style}
                    style={{
                      ...((provided.draggableProps.style ||
                        {}) as CSSProperties)
                    }}
                  >
                    {item.content}
                  </DNDItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </DnDListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
