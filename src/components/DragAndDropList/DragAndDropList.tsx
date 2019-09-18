// todo remove deprecate component.

import * as React from 'react';
import { find } from 'lodash';
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DraggableProvided,
  DraggableStateSnapshot,
  DragStart,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
  ResponderProvided
} from 'react-beautiful-dnd';
import { DNDContainer, DNDItem, DNDList } from './style';
import { VCardPanel } from '../Card';
import { IDNDItem, IDNDList } from './types';
import { VInputField } from '../Form';
import { Button } from '@blueprintjs/core';
import { Scrollbar } from 'react-scrollbars-custom';
import styled from 'styled-components';

interface Item {
  id: string;
  content: string;
}
interface IAppState {
  items: IDNDList[];
  filterValues: any;
  draggableId: string;
  selectedItemId: any;
}

interface IProps {
  containerOrientation?: 'horizontal' | 'vertical';
  list: IDNDList[];
  onDragAndDrop?: (list: IDNDList[]) => void;
  allowItemSelection?: boolean;
  onItemSelected?: (item: any) => void;
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
  droppableDestination: DraggableLocation,
  draggableId: string
): any => {
  const itemToMove = source.list.find(item => item.value === draggableId);
  const sourceClone = source;
  const destClone = destination;
  if (itemToMove) {
    sourceClone.list = sourceClone.list.filter(
      item => item.value !== itemToMove.value
    );
    destClone.list.splice(droppableDestination.index, 0, itemToMove);
  }
  return [sourceClone, destClone];
};

export class DragAndDropList extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      items: this.props.list,
      filterValues: {},
      draggableId: '',
      selectedItemId: ''
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    const newFilters: any = {};
    this.props.list.forEach((item: IDNDList) => {
      if (item.allowFilter) {
        newFilters[`filter_${item.id}`] = '';
      }
    });
    this.setState({ filterValues: newFilters });
  }

  updateFilter = (value: any, key: string) => {
    const filterValues = this.state.filterValues;
    filterValues[key] = value;
    this.setState({ filterValues });
  };

  public getList(id: string): IDNDList {
    return (
      find(this.state.items, (value: IDNDList) => {
        return value.id === id;
      }) || { id: '', list: [] }
    );
  }

  public displayItem = (
    item: IDNDItem,
    criteria: any,
    allowFilter: boolean
  ) => {
    if (!allowFilter || !criteria || !item.label) {
      return true;
    }
    return item.label
      .toString()
      .toLowerCase()
      .includes(criteria.toString());
  };

  public onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    this.setState({ draggableId: initial.draggableId });
  };

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
        destination,
        this.state.draggableId
      );

      this.setState({ ...this.state, ...items, draggableId: '' });
    }
    if (this.props.onDragAndDrop) {
      this.props.onDragAndDrop(this.state.items);
    }
  }

  public handleItemSelection = (selectedItemId: any) => {
    if (this.props.allowItemSelection) {
      this.setState({ selectedItemId });
      if (this.props.onItemSelected) {
        this.props.onItemSelected(selectedItemId);
      }
    }
  };

  public render() {
    return (
      <DNDContainer orientation={this.props.containerOrientation}>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
        >
          {this.props.list.map((value: IDNDList, index: number) => {
            return (
              <Droppable droppableId={value.id} key={index}>
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot
                ) => (
                  <VCardPanel
                    bodyPadding={'5px'}
                    width={value.width || '200px'}
                    headerText={value.label}
                    height={value.height || '250px'}
                    id={value.id}
                    headerColor={value.headerColor}
                    headerBackgroundColor={value.headerBackgroundColor}
                  >
                    {(value.allowFilter && (
                      <FilterInput
                        fill
                        id={`filter_${value.id}`}
                        round
                        noLabel
                        leftIcon={'search'}
                        value={this.state.filterValues[`filter_${value.id}`]}
                        onChange={filterValue => {
                          this.updateFilter(filterValue, `filter_${value.id}`);
                        }}
                        rightElement={
                          <Button
                            icon={'refresh'}
                            onClick={() => {
                              this.updateFilter('', `filter_${value.id}`);
                            }}
                            minimal
                            small
                          />
                        }
                      />
                    )) ||
                      null}
                    <StyledScrollBar
                      style={{
                        height: `calc(100%${(value.allowFilter && ' - 35px') ||
                          ''})`
                      }}
                    >
                      <DNDList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {value.list
                          .filter((item: IDNDItem) =>
                            this.displayItem(
                              item,
                              this.state.filterValues[`filter_${value.id}`],
                              !!value.allowFilter
                            )
                          )
                          .map((item: IDNDItem, index: number) => (
                            <Draggable
                              key={`${value.id}-${index}`}
                              draggableId={item.value}
                              index={index}
                            >
                              {(
                                providedDraggable: DraggableProvided,
                                snapshotDraggable: DraggableStateSnapshot
                              ) => (
                                <DNDItem
                                  onClick={() => {
                                    this.handleItemSelection(item.value);
                                  }}
                                  className={`${!this.state.draggableId &&
                                    this.state.selectedItemId === item.value &&
                                    'dndItemSelected'}`}
                                >
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
                    </StyledScrollBar>
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

const StyledScrollBar = styled(Scrollbar)`
  & .ScrollbarsCustom-Content {
    height: 100%;
    & > div {
      height: 100%;
      & > div.dndItemSelected {
        background-color: rgba(104, 167, 218, 0.6);
      }
    }
  }
`;

const FilterInput = styled(VInputField)`
  margin: 0 0 2px;
`;
