// todo remove deprecate component.

import React, { useEffect, useState } from 'react';
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
import {
  IDNDItem,
  IDNDList,
  IDragAndDropListProps,
  IDragAndDropListState
} from './types';
import { VCardPanel, VInputField } from '../index';
import { Button } from '@blueprintjs/core';
import { Scrollbar } from 'react-scrollbars-custom';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

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

export const DragAndDropList = observer((props: IDragAndDropListProps) => {
  const [state, setState] = useState<IDragAndDropListState>({
    items: props.list,
    filterValues: {},
    draggableId: '',
    selectedItemId: ''
  });

  useEffect(() => {
    setState({ ...state, items: props.list || [] });
  }, [props.list]);

  useEffect(() => {
    const newFilters: any = {};
    props.list.forEach((item: IDNDList) => {
      if (item.allowFilter) {
        newFilters[`filter_${item.id}`] = '';
      }
    });
    setState({ ...state, items: props.list || [] });
  }, []);

  const updateFilter = (value: any, key: string) => {
    const filterValues = state.filterValues;
    filterValues[key] = value;
    setState({ ...state, filterValues });
  };

  const getList = (id: string): IDNDList => {
    return (
      find(props.list, (value: IDNDList) => {
        return value.id === id;
      }) || { id: '', list: [] }
    );
  };

  const displayItem = (item: IDNDItem, criteria: any, allowFilter: boolean) => {
    if (!allowFilter || !criteria || !item.label) {
      return true;
    }
    return item.label
      .toString()
      .toLowerCase()
      .includes(criteria.toString().toLowerCase());
  };

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    setState({ ...state, draggableId: initial.draggableId });
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let items: any = {};
    if (source.droppableId === destination.droppableId) {
      items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      setState({ ...state, ...items });
    } else {
      items = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination,
        state.draggableId
      );
    }
    if (props.onDragAndDrop) {
      props.onDragAndDrop({
        list: state.items,
        source,
        destination,
        draggableId: state.draggableId
      });
    }
    setState({ ...state, ...items, draggableId: '' });
  };
  const handleItemSelection = (itemId: any) => {
    if (props.allowItemSelection) {
      const selectedItemId = itemId !== state.selectedItemId ? itemId : '';
      setState({ ...state, selectedItemId });
      if (props.onItemSelected) {
        props.onItemSelected(selectedItemId);
      }
    }
  };

  return (
    <DNDContainer orientation={props.containerOrientation}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {props.list.map((value: IDNDList, index: number) => {
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
                      value={state.filterValues[`filter_${value.id}`]}
                      onChange={filterValue => {
                        updateFilter(filterValue, `filter_${value.id}`);
                      }}
                      rightElement={
                        <Button
                          icon={'refresh'}
                          onClick={() => {
                            updateFilter('', `filter_${value.id}`);
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
                          displayItem(
                            item,
                            state.filterValues[`filter_${value.id}`],
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
                                  handleItemSelection(item.value);
                                }}
                                className={`${!state.draggableId &&
                                  state.selectedItemId === item.value &&
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
});

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
