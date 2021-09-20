import React, { Component } from 'react';
import { Classes } from '@blueprintjs/core';
import {
  ElevationType,
  IItemsList,
  ISelectionListProps
} from './ISelectionList';
import { SelectionListContainer, StyledMenu, StyledMenuItem } from './style';
import { EmptyData } from './EmptyData';

interface ISelctionListState {
  listSelected: IItemsList[];
}

export class VSelectionList extends Component<
  ISelectionListProps,
  ISelctionListState
> {
  constructor(props: ISelectionListProps) {
    super(props);
  }

  public state: ISelctionListState = {
    listSelected: this.props.elements.filter(e => e.active)
  };
  isActive = (elements: IItemsList) => {
    return !!this.state.listSelected.find(e => e.value === elements.value);
  };
  onItemClick = (active: boolean, element: IItemsList, event: any) => {
    const newElement = { ...element, active: !element.active };
    this.props.onSelect(newElement, event);
  };

  getElevation = (elevation: ElevationType): any => {
    switch (elevation) {
      case 0:
        return Classes.ELEVATION_0;
      case 1:
        return Classes.ELEVATION_1;
      case 2:
        return Classes.ELEVATION_2;
      case 3:
        return Classes.ELEVATION_3;
      case 4:
        return Classes.ELEVATION_4;
      default:
        return Classes.ELEVATION_0;
    }
  };

  getElements = (elements: IItemsList[]): IItemsList[] => {
    return this.props.enableEnumeration
      ? getElementsEnumerated(elements)
      : elements;
  };

  render() {
    const {
      elements,
      selection,
      elevation,
      className,
      padding,
      height,
      getTemplate
    } = this.props;

    return (
      <SelectionListContainer height={height}>
        {(elements && elements.length) > 0 ? (
          <StyledMenu
            className={`${this.getElevation(elevation || 0)} ${className}`}
            padding={padding}
          >
            {this.getElements(elements).map(element => {
              const { active, text, value, icon } = element;
              const backgroundColor =
                !!selection && !!selection.background
                  ? selection!.background
                  : '#0072ce';
              const textColor =
                !!selection && !!selection.textColor
                  ? selection!.textColor
                  : 'white';
              return (
                <StyledMenuItem
                  key={value}
                  active={active}
                  background={backgroundColor}
                  color={textColor}
                  text={getTemplate?.(element) ?? text}
                  onDoubleClick={() => {
                    this.props.onDoubleClick!(element);
                  }}
                  onClick={(event: any) => {
                    this.onItemClick(active || false, element, event);
                  }}
                  icon={icon}
                />
              );
            })}
          </StyledMenu>
        ) : (
          <EmptyData settings={undefined} />
        )}
      </SelectionListContainer>
    );
  }
}

export const getElementsEnumerated = (elements: IItemsList[]): IItemsList[] => {
  return elements.map((item: IItemsList, index: number) => ({
    ...item,
    text: `${index + 1}) ${item.text}`
  }));
};
