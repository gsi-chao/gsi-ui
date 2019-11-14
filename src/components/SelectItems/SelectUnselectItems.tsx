import React, { Component } from 'react';
import { Button, Divider, Tooltip } from '@blueprintjs/core';
import { FieldState, FormState } from 'formstate';
import {
  BodyContainer,
  ButtonsEndsContainers,
  CentralFlexCol,
  FlexCol,
  SelectAllButtons,
  StyledScroll,
  VSelectionListStyled
} from './styles';
import { IItemsList } from '../SelectionList';
import { VSelectField } from '../Form';
import { Scrollbar } from 'react-scrollbars-custom';

export interface ISelectItemsProps {
  itemsUnassigned: IItemsList[];
  itemsAssigned: IItemsList[];
  unAssignedText?: string;
  assignedText?: string;
  handleSave: any;
  handleCancel: any;
  listsHeights?: string;
  intentSave?: any;
  intentCancel?: any;
  displayCount?: boolean;
  selection?: {
    textColor: string;
    background: string;
  };
}
export interface ISelectItemsState {
  itemsUnassigned: IItemsList[];
  itemsAssigned: IItemsList[];
}

export class SelectUnselectItems extends Component<
  ISelectItemsProps,
  ISelectItemsState
> {
  form: FormState<any>;
  constructor(props: ISelectItemsProps) {
    super(props);
    this.form = new FormState<any>({
      unselected: new FieldState(''),
      selected: new FieldState('')
    });
    this.state = {
      itemsUnassigned: [],
      itemsAssigned: []
    };
  }

  componentDidMount() {
    const { itemsAssigned, itemsUnassigned } = this.props;
    this.setState({ itemsAssigned, itemsUnassigned });
  }

  selectItems = () => {
    const { itemsAssigned } = this.state;
    let { itemsUnassigned } = this.state;
    itemsUnassigned = itemsUnassigned.filter(item => {
      if (item.active) {
        item.active = false;
        itemsAssigned.push(item);
        return false;
      }
      return true;
    });
    this.setState({ itemsAssigned, itemsUnassigned });
  };

  unselectItems = () => {
    const { itemsUnassigned } = this.state;
    let { itemsAssigned } = this.state;
    itemsAssigned = itemsAssigned.filter(item => {
      if (item.active) {
        item.active = false;
        itemsUnassigned.push(item);
        return false;
      }
      return true;
    });
    this.setState({ itemsAssigned, itemsUnassigned });
  };

  selectItemFromUnselectedList = (element: IItemsList) => {
    const { itemsUnassigned } = this.state;
    let itemIndex = -1;
    itemsUnassigned.some((stateItem, index) => {
      if (element.value === stateItem.value) {
        itemIndex = index;
      }
      return element.value === stateItem.value;
    });
    if (itemIndex !== -1) {
      itemsUnassigned[itemIndex].active = element.active;
    }
    this.setState({ itemsUnassigned });
  };

  selectItemFromSelectedList = (element: IItemsList) => {
    const { itemsAssigned } = this.state;
    let itemIndex = -1;
    itemsAssigned.some((stateItem, index) => {
      if (element.value === stateItem.value) {
        itemIndex = index;
      }
      return element.value === stateItem.value;
    });
    if (itemIndex !== -1) {
      itemsAssigned[itemIndex].active = element.active;
    }
    this.setState({ itemsAssigned });
  };

  selectAll = () => {
    let { itemsAssigned, itemsUnassigned } = this.state;
    itemsAssigned = [...itemsAssigned, ...itemsUnassigned];
    itemsUnassigned = [];
    this.setState({ itemsAssigned, itemsUnassigned });
  };

  unselectAll = () => {
    let { itemsAssigned, itemsUnassigned } = this.state;
    itemsUnassigned = [...itemsUnassigned, ...itemsAssigned];
    itemsAssigned = [];
    this.setState({ itemsAssigned, itemsUnassigned });
  };

  markFromUnassigned = (elementValue: string) => {
    const { itemsUnassigned } = this.state;
    const newElement = itemsUnassigned.find(
      item => item.value === elementValue
    );
    if (newElement) {
      newElement.active = true;
      this.selectItemFromUnselectedList(newElement);
    }
  };

  markFromAssigned = (elementValue: string) => {
    const { itemsAssigned } = this.state;
    const newElement = itemsAssigned.find(item => item.value === elementValue);
    if (newElement) {
      newElement.active = true;
      this.selectItemFromSelectedList(newElement);
    }
  };

  handleSave = () => {
    const { itemsUnassigned, itemsAssigned } = this.state;
    this.props.handleSave({ itemsUnassigned, itemsAssigned });
  };
  handleCancel = () => {
    this.props.handleCancel();
  };

  render() {
    const { intentSave, intentCancel, displayCount } = this.props;
    const { itemsUnassigned, itemsAssigned } = this.state;
    const itemsUnassignedSearch = itemsUnassigned.map(item => ({
      label: item.text,
      value: item.value
    }));
    const itemsAssignedSearch = itemsAssigned.map(item => ({
      label: item.text,
      value: item.value
    }));
    return (
      <React.Fragment>
        <BodyContainer>
          <FlexCol flex={4}>
            <h4>{`${this.props.unAssignedText || 'UnAssigned'} ${displayCount &&
              `(${(itemsUnassigned && itemsUnassigned.length) || 0})` || ''}`}</h4>
            <StyledScroll
              height={this.props.listsHeights || '242.5px'}
              style={{ height: this.props.listsHeights || '242.5px' }}
            >
              <VSelectionListStyled
                selection={this.props.selection}
                elements={itemsUnassigned}
                onSelect={this.selectItemFromUnselectedList}
                height={this.props.listsHeights || '242.5px'}
              />
            </StyledScroll>
            <VSelectField
              fill
              noLabel
              minimal
              defaultText={'Search'}
              margin={'10px 0 10px'}
              options={itemsUnassignedSearch}
              id={'unselected'}
              fieldState={this.form.$.unselected}
              onChange={this.markFromUnassigned}
              popoverProps={{
                minimal: true
              }}
            />
          </FlexCol>
          <CentralFlexCol flex={1}>
            <Tooltip usePortal hoverCloseDelay={0} content={'Select'}>
              <Button
                large
                minimal
                icon={'chevron-right'}
                onClick={this.selectItems}
              />
            </Tooltip>
            <Tooltip usePortal hoverCloseDelay={0} content={'Unselect'}>
              <Button
                large
                minimal
                icon={'chevron-left'}
                onClick={this.unselectItems}
              />
            </Tooltip>
            <Tooltip usePortal hoverCloseDelay={0} content={'Select All'}>
              <Button
                large
                minimal
                icon={'double-chevron-right'}
                onClick={this.selectAll}
              />
            </Tooltip>
            <Tooltip usePortal hoverCloseDelay={0} content={'Unselect All'}>
              <Button
                large
                minimal
                icon={'double-chevron-left'}
                onClick={this.unselectAll}
              />
            </Tooltip>
          </CentralFlexCol>
          <FlexCol flex={4}>
            <h4>{`${this.props.assignedText || 'Assigned'} ${displayCount &&
            `(${(itemsAssigned && itemsAssigned.length) || 0})` || ''}`}</h4>
            <StyledScroll
              height={this.props.listsHeights || '242.5px'}
              style={{ height: this.props.listsHeights || '242.5px' }}
            >
              <VSelectionListStyled
                selection={this.props.selection}
                elements={itemsAssigned}
                onSelect={this.selectItemFromSelectedList}
                height={this.props.listsHeights || '242.5px'}
              />
            </StyledScroll>
            <VSelectField
              fill
              minimal
              noLabel
              margin={'10px 0 10px'}
              defaultText={'Search'}
              options={itemsAssignedSearch}
              id={'selected'}
              fieldState={this.form.$.selected}
              onChange={this.markFromAssigned}
              popoverProps={{
                minimal: true
              }}
            />
          </FlexCol>
        </BodyContainer>
        <ButtonsEndsContainers>
          <Button
            minimal
            intent={intentSave ? intentSave : 'success'}
            icon={'tick'}
            text={'Save'}
            onClick={this.handleSave}
          />
          <Button
            minimal
            intent={intentCancel ? intentCancel : 'danger'}
            icon={'disable'}
            onClick={this.handleCancel}
            text={'Cancel'}
          />
        </ButtonsEndsContainers>
      </React.Fragment>
    );
  }
}
