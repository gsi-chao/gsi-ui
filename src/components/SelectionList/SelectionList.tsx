import React, { Component } from 'react';
import { Classes } from '@blueprintjs/core';
import {
  ElevationType,
  IItemsList,
  ISelectionListProps
} from './ISelectionList';
import { StyledMenu, StyledMenuItem } from './style';

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
  onItemClick = (active: boolean, element: IItemsList) => {
    /*const { listSelected } = this.state;
    let new_list: IItemsList[];

    active
      ? (new_list = listSelected.filter(e => e.value !== element.value))
      : (new_list = listSelected.concat(element));
    this.setState({ listSelected: new_list });*/
    const newElement = { ...element, active: !element.active };
    this.props.onSelect(newElement);
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
  render() {
    const { elements, selection, elevation, className, padding } = this.props;

    return (
      <StyledMenu
        className={`${this.getElevation(elevation || 0)} ${className}`}
        padding={padding}
      >
        {elements.map(element => {
          const { active, text, value, icon } = element;
          const backgroundColor =
            !!selection && !!selection.background
              ? selection!.background
              : '#1985A1';
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
              text={text}
              onClick={() => {
                this.onItemClick(active || false, element);
              }}
              icon={icon}
            />
          );
        })}
      </StyledMenu>
    );
  }
}
