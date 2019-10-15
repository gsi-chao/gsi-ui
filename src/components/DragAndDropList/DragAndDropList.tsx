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
import { DNDContainer, DNDList, DragListSpinnerContainer, FilterInput, StyledDivContainer } from './style';
import { IDNDItem, IDNDList, IDragAndDropListProps, IDragAndDropListState } from './types';
import { VCardPanel } from '../Card';
import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { VSpinner } from '../Spinner';
import { DNDItemWrapper } from './DNDItemWrapper';

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
    selectedItemId: '',
    draggableItemSourceId: ''
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
    setState({
      ...state,
      draggableId: initial.draggableId,
      draggableItemSourceId:
        initial && initial.source && initial.source.droppableId
    });
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) {
      setState({
        ...state,
        draggableId: '',
        draggableItemSourceId: ''
      });
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
        source,
        destination,
        list: state.items,
        draggableId: state.draggableId
      });
    }
    setState({
      ...state,
      ...items,
      draggableId: '',
      draggableItemSourceId: ''
    });
  };

  const handleItemSelection = (itemId: any, listId: any) => {
    if (props.allowItemSelection) {
      const selectedItemId = itemId !== state.selectedItemId ? itemId : '';
      setState({ ...state, selectedItemId });
      if (props.onItemSelected) {
        props.onItemSelected(selectedItemId, listId);
      }
    }
  };

  const handleDoubleClick = (selectedItemId: any, listId: any) => {
    if (props.allowItemSelection) {
      setState({ ...state, selectedItemId });
      if (props.onDoubleClickItem) {
        props.onDoubleClickItem(selectedItemId, listId);
      }
    }
  };

  const handleHelpButtonCLicked = (
    itemId: any,
    source: any,
    destination: any
  ) => {
    const lists = state.items;
    const sourceList = lists.find(e => e.id === source);
    if (sourceList) {
      const item = sourceList.list.find(i => i.value === itemId);
      if (item) {
        sourceList.list = sourceList.list.filter(i => i.value !== itemId);
        const destList = lists.find(e => e.id === destination);
        if (destList) {
          destList.list = [...destList.list, item];
        }
        if (destList) {
          lists.some((item: IDNDList, index: number) => {
            const result = item.id === sourceList.id;
            if (result) {
              lists[index] = sourceList;
            }
            return result;
          });
          lists.some((item: IDNDList, index: number) => {
            const result = item.id === destList.id;
            if (result) {
              lists[index] = destList;
            }
            return result;
          });
          setState({
            ...state,
            items: lists,
            selectedItemId: itemId
          });
          if (props.onHelpButtonClicked) {
            props.onHelpButtonClicked(itemId, source, destination);
          }
        }
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
                  {(value.loading && (
                    <DragListSpinnerContainer>
                      <VSpinner size={100} />
                    </DragListSpinnerContainer>
                  )) || (
                    <StyledDivContainer
                      sourceListBackGroundColor={
                        props.sourceListBackGroundColor
                      }
                      className={
                        (state.draggableId &&
                          state.draggableItemSourceId === value.id &&
                          'sourceList') ||
                        ''
                      }
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
                      <DNDList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          height: `calc(100%${(value.allowFilter &&
                            ' - 35px') ||
                            ''})`
                        }}
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
                              key={`${value.id}-${item.value}`}
                              draggableId={item.value}
                              index={index}
                            >
                              {(
                                providedDraggable: DraggableProvided,
                                snapshotDraggable: DraggableStateSnapshot
                              ) => (
                                <DNDItemWrapper
                                  onClick={() => {
                                    handleItemSelection(item.value, value.id);
                                  }}
                                  onDoubleClick={() => {
                                    handleDoubleClick(item.value, value.id);
                                  }}
                                  className={`${state.selectedItemId &&
                                    state.selectedItemId === item.value &&
                                    'dndItemSelected'}`}
                                  providedDraggable={providedDraggable}
                                  item={item}
                                  displayButtons={
                                    props.showHelpButtons &&
                                    item.value === state.selectedItemId
                                  }
                                  selectedItemHelpButtons={
                                    props.selectedItemHelpButtons
                                  }
                                  value={value}
                                />
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </DNDList>
                    </StyledDivContainer>
                  )}
                </VCardPanel>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </DNDContainer>
  );
});
