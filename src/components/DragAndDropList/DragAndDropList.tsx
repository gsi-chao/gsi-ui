import * as React from 'react';
import { find } from 'lodash';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DraggableLocation,
  DropResult,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot
} from 'react-beautiful-dnd';
import { DNDContainer, DNDItem, DNDList } from './style';
import { VCardPanel } from '../Card';
import { IDNDItem, IDNDList } from './types';

interface Item {
  id: string;
  content: string;
}
interface IAppState {
  items: IDNDList[];
}

interface IProps {
  containerOrientation?: 'horizontal' | 'vertical';
  list: IDNDList[];
  onDragAndDrop?: (list: IDNDList[]) => void;
}

const reorder = (
  list: IDNDList,
  startIndex: number,
  endIndex: number
): IDNDList => {
  const result = list;
  const [removed] = result.list.splice(startIndex, 1);
  result.list.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: IDNDList,
  destination: IDNDList,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): any => {
  const sourceClone = source;
  const destClone = destination;
  const [removed] = sourceClone.list.splice(droppableSource.index, 1);

  destClone.list.splice(droppableDestination.index, 0, removed);
  const result = [sourceClone, destClone];
  return result;
};

export class DragAndDropList extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      items: this.props.list
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.getList = this.getList.bind(this);
  }

  public getList(id: string): IDNDList {
    return (
      find(this.state.items, (value: IDNDList) => {
        return value.id === id;
      }) || { id: '', list: [] }
    );
  }

  public onDragEnd(result: DropResult): void {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      this.setState({ ...this.state, ...items });
    } else {
      const items: any = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({ ...this.state, ...items });
    }
    if (this.props.onDragAndDrop) {
      this.props.onDragAndDrop(this.state.items);
    }
  }

  public render() {
    return (
      <DNDContainer orientation={this.props.containerOrientation}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.props.list.map((value: IDNDList, index: number) => {
            return (
              <Droppable droppableId={value.id} key={index}>
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot
                ) => (
                  <VCardPanel
                    bodyPadding={'5px'}
                    width={'200px'}
                    headerText={value.label}
                  >
                    <DNDList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {value.list.map((item: IDNDItem, index: number) => (
                        <Draggable
                          key={`${value.id}-${index}`}
                          draggableId={item.value}
                          index={index}
                        >
                          {(
                            providedDraggable: DraggableProvided,
                            snapshotDraggable: DraggableStateSnapshot
                          ) => (
                            <DNDItem>
                              <div
                                ref={providedDraggable.innerRef}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                              >
                                {item.label}
                              </div>
                              {providedDraggable.placeholder}
                            </DNDItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </DNDList>
                  </VCardPanel>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </DNDContainer>
    );
  }
}
