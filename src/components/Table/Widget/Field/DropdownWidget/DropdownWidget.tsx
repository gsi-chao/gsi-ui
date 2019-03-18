import React, { Component } from 'react';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import { Button } from '@blueprintjs/core';
import styled from 'styled-components';
import { DropdownStyled } from './style';
import { ActionClickWidget, IPropsWidgets } from '../../Widget';

export interface IOption {
  value: string | number;
  label: string;
  index: number;
}

export const DefaultSelect = Select.ofType<IOption>();

export interface IDropdownWidget {
  valueSelected?: string | number;
  filterable?: boolean;
  options: IOption[];
}

export interface IProps
  extends IDropdownWidget,
    ActionClickWidget,
    IPropsWidgets {}

class DropdownWidget extends Component<IProps, IDropdownWidget> {
  constructor(props: IProps) {
    super(props);
    const valueSelected = this.findValueSelected(props);
    this.state = {
      valueSelected: valueSelected ? valueSelected.value : undefined,
      filterable: props.filterable ? props.filterable : false,
      options: props.options
    };
  }

  private findValueSelected(props: IProps) {
    return props.options.find(x => x.value === props.valueSelected);
  }

  render() {
    const valueSelected = this.findValueSelected(this.props);
    if (valueSelected) {
      const options = this.state.options;
      return (
        <DefaultSelect
          items={options}
          itemPredicate={this.filterOption}
          itemRenderer={this.renderOption}
          filterable={this.state.filterable}
          onItemSelect={this.handleValueChange}
          disabled={this.props.disable}
          popoverProps={{ minimal: true }}
        >
          <DropdownStyled
            isValid={this.props.isValid!}
            isDisable={this.props.disable}
          >
            <Button
              style={{ width: '100%' }}
              rightIcon="caret-down"
              text={valueSelected ? valueSelected.label : '(No selection)'}
            />
          </DropdownStyled>
        </DefaultSelect>
      );
    }

    return null;
  }

  filterOption: ItemPredicate<IOption> = (query, option) => {
    return (
      `${option.index}. ${option.label.toLowerCase()} `.indexOf(
        query.toLowerCase()
      ) >= 0
    );
  };

  renderOption: ItemRenderer<IOption> = (
    option,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const text = ` ${option.label}`;

    const Item = styled.p`
      cursor: pointer;
      padding: 4px 8px;
      :hover {
        background-color: rgba(167, 182, 194, 0.3);
      }
    `;

    return (
      <Item key={option.index} onClick={handleClick}>
        {text}
      </Item>
    );
  };

  handleValueChange = (option: IOption) => {
    this.setState({ valueSelected: option.value });
    this.props.onClick(this.props.row, this.props.column, option.value);
  };
}

export default DropdownWidget;
