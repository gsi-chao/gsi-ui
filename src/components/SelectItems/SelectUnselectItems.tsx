import React, { Component } from 'react';
import { Button, IconName, Tooltip } from '@blueprintjs/core';
import { FieldState, FormState } from 'formstate';
import {
  BodyContainer,
  ButtonsEndsContainers,
  CentralFlexCol,
  FlexCol,
  StyledScroll,
  VSelectionListStyled
} from './styles';
import { IItemsList } from '../SelectionList';
import { VInputFieldWithSuggestions } from '../Form';
import { getElementsEnumerated } from '../SelectionList/SelectionList';
import { cloneDeep } from 'lodash';

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
  enableSelectedOrdering?: boolean;
  selection?: {
    textColor: string;
    background: string;
  };
}
export interface ISelectItemsState {
  itemsUnassigned: IItemsList[];
  itemsAssigned: IItemsList[];
  lastSelectedUnnasigned: IItemsList | null;
  lastSelectedAssigned: IItemsList | null;
  queryUnnassigned?: string;
  queryAssigned?: string;
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
      itemsAssigned: [],
      lastSelectedAssigned: null,
      lastSelectedUnnasigned: null
    };
    this.setState = this.setState.bind(this);
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
    this.setState({ itemsAssigned, itemsUnassigned, queryUnnassigned: '' });
    this.form.$.unselected.onChange('');
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
    this.setState({ itemsAssigned, itemsUnassigned , queryAssigned: '' });
    this.form.$.selected.onChange('');
  };

  selectItemFromUnselectedList = (element: IItemsList, evt?: any) => {
    const {
      itemsUnassigned,
      lastSelectedUnnasigned,
      queryUnnassigned
    } = this.state;
    const newList = handleListSelection(
      element,
      itemsUnassigned,
      lastSelectedUnnasigned,
      evt,
      queryUnnassigned
    );
    this.setState({
      itemsUnassigned: newList,
      lastSelectedUnnasigned: evt.shiftKey ? lastSelectedUnnasigned : element
    });
  };

  selectItemFromSelectedList = (element: IItemsList, evt?: any) => {
    const { itemsAssigned, lastSelectedAssigned, queryAssigned } = this.state;
    const newList = handleListSelection(
      element,
      itemsAssigned,
      lastSelectedAssigned,
      evt,
      queryAssigned
    );
    this.setState({
      itemsAssigned: newList,
      lastSelectedAssigned: evt.shiftKey ? lastSelectedAssigned : element
    });
  };

  selectAll = () => {
    let { itemsAssigned, itemsUnassigned } = this.state;
    const newItemsUnnasigned: IItemsList[] = [];
    const newItemsAssigned: IItemsList[] = itemsAssigned.map(item => ({
      ...item,
      active: false
    }));
    itemsUnassigned = itemsUnassigned.map(item => ({
      ...item,
      active: false
    }));
    itemsUnassigned.forEach(item => {
      if (
        !this.state.queryUnnassigned ||
        item.text
          .toUpperCase()
          .includes(this.state.queryUnnassigned.toUpperCase())
      ) {
        newItemsAssigned.push({ ...item, active: false });
      } else {
        newItemsUnnasigned.push(item);
      }
    });
    this.setState({
      itemsAssigned: newItemsAssigned,
      itemsUnassigned: newItemsUnnasigned,
      queryUnnassigned: ''
    });
    this.form.$.unselected.onChange('');
  };

  unselectAll = () => {
    let { itemsAssigned, itemsUnassigned } = this.state;
    const newItemsAssigned: IItemsList[] = [];
    const newItemsUnnasigned: IItemsList[] = itemsUnassigned.map(item => ({
      ...item,
      active: false
    }));
    itemsAssigned.map(item => ({
      ...item,
      active: false
    }));
    itemsAssigned.forEach(item => {
      if (
        !this.state.queryAssigned ||
        item.text.toUpperCase().includes(this.state.queryAssigned.toUpperCase())
      ) {
        newItemsUnnasigned.push({ ...item, active: false });
      } else {
        newItemsAssigned.push(item);
      }
    });
    this.setState({
      itemsAssigned: newItemsAssigned,
      itemsUnassigned: newItemsUnnasigned,
      queryAssigned: ''
    });
    this.form.$.selected.onChange('');
  };

  handleSave = () => {
    const { itemsUnassigned, itemsAssigned } = this.state;
    this.props.handleSave({ itemsUnassigned, itemsAssigned });
  };

  handleCancel = () => {
    this.props.handleCancel();
  };

  getAssignedItems = (elements: IItemsList[]): IItemsList[] => {
    return this.props.enableSelectedOrdering
      ? getElementsEnumerated(elements)
      : elements;
  };

  reorderSelectedItems = (direction: 'UP' | 'DOWN') => {
    if (this.state.itemsAssigned.filter(item => item.active).length === 1) {
      const itemsAssigned = cloneDeep(this.state.itemsAssigned);
      let itemIndex = -1;
      const item = this.state.itemsAssigned.find((item, index) => {
        if (item.active) {
          itemIndex = index;
        }
        return item.active;
      });
      if (item && itemIndex !== -1) {
        if (direction === 'UP' && itemIndex > 0) {
          const otherItem = itemsAssigned[itemIndex - 1];
          itemsAssigned[itemIndex - 1] = item;
          itemsAssigned[itemIndex] = otherItem;
        } else if (
          direction === 'DOWN' &&
          itemIndex < itemsAssigned.length - 1
        ) {
          const otherItem = itemsAssigned[itemIndex + 1];
          itemsAssigned[itemIndex + 1] = item;
          itemsAssigned[itemIndex] = otherItem;
        }
        this.setState({ itemsAssigned });
      }
    }
  };

  disableReorderButtons = (direction: 'UP' | 'DOWN') => {
    if (this.state.itemsAssigned.filter(item => item.active).length !== 1) {
      return true;
    }
    let itemIndex = -1;
    this.state.itemsAssigned.some((item, index) => {
      if (item.active) {
        itemIndex = index;
      }
      return item.active;
    });
    return (
      (direction === 'UP' && itemIndex === 0) ||
      (direction === 'DOWN' &&
        itemIndex === this.state.itemsAssigned.length - 1)
    );
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
            <h4>{`${this.props.unAssignedText ||
              'UnAssigned'} ${(displayCount &&
              `(${(itemsUnassigned && itemsUnassigned.length) || 0})`) ||
              ''}`}</h4>
            <StyledScroll
              height={this.props.listsHeights || '242.5px'}
              style={{
                height: this.props.listsHeights || '242.5px',
                marginBottom: '6px'
              }}
            >
              <VSelectionListStyled
                selection={this.props.selection}
                elements={itemsUnassigned.filter(
                  item =>
                    !this.state.queryUnnassigned ||
                    item.text.toUpperCase().includes(this.state.queryUnnassigned.toUpperCase())
                )}
                onSelect={this.selectItemFromUnselectedList}
                height={this.props.listsHeights || '242.5px'}
              />
            </StyledScroll>
            <div style={{ width: 'calc(100% + 3px)', marginBottom: '5px' }}>
              <VInputFieldWithSuggestions
                fill
                noLabel
                minimal
                placeholder={'Search...'}
                margin={'10px 0 10px'}
                options={itemsUnassignedSearch}
                id={'unselected'}
                fieldState={this.form.$.unselected}
                upperCaseFormat
                autoComplete={'no'}
                onChange={value => {
                  onAutoComplete(
                    value,
                    this.state,
                    this.setState,
                    'queryUnnassigned',
                    'itemsUnassigned'
                  );
                }}
                layer={{
                  inputWidth: 12
                }}
              />
            </div>
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
            {this.props.enableSelectedOrdering && (
              <>
                <ButtonWithTooltipAllowingDisable
                  disabled={this.disableReorderButtons('UP')}
                  onClick={() => {
                    this.reorderSelectedItems('UP');
                  }}
                  icon={'chevron-up'}
                  text={'Move Item up'}
                />
                <ButtonWithTooltipAllowingDisable
                  disabled={this.disableReorderButtons('DOWN')}
                  onClick={() => {
                    this.reorderSelectedItems('DOWN');
                  }}
                  icon={'chevron-down'}
                  text={'Move Item Down'}
                />
              </>
            )}
          </CentralFlexCol>
          <FlexCol flex={4}>
            <h4>{`${this.props.assignedText || 'Assigned'} ${(displayCount &&
              `(${(itemsAssigned && itemsAssigned.length) || 0})`) ||
              ''}`}</h4>
            <StyledScroll
              height={this.props.listsHeights || '242.5px'}
              style={{
                height: this.props.listsHeights || '242.5px',
                marginBottom: '6px'
              }}
            >
              <VSelectionListStyled
                selection={this.props.selection}
                elements={this.getAssignedItems(itemsAssigned).filter(
                  item =>
                    !this.state.queryAssigned ||
                    item.text.toUpperCase().includes(this.state.queryAssigned.toUpperCase())
                )}
                onSelect={this.selectItemFromSelectedList}
                height={this.props.listsHeights || '242.5px'}
              />
            </StyledScroll>
            <div style={{ width: 'calc(100% + 3px)', marginBottom: '5px' }}>
              <VInputFieldWithSuggestions
                fill
                minimal
                noLabel
                margin={'10px 0 10px'}
                placeholder={'Search...'}
                options={itemsAssignedSearch}
                id={'selected'}
                upperCaseFormat
                fieldState={this.form.$.selected}
                autoComplete={'no'}
                onChange={value => {
                  onAutoComplete(
                    value,
                    this.state,
                    this.setState,
                    'queryAssigned',
                    'itemsAssigned'
                  );
                }}
                layer={{
                  inputWidth: 12
                }}
              />
            </div>
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

const onAutoComplete = (
  value: any,
  state: ISelectItemsState,
  setState: any,
  stateKey: 'queryAssigned' | 'queryUnnassigned',
  stateList: 'itemsUnassigned' | 'itemsAssigned'
) => {
  if (value !== state[stateKey]) {
    const newList = cloneDeep(state[stateList] || []);
    newList.forEach(item => {
      if (value && !item.text.toUpperCase().includes(value.toUpperCase())) {
        item.active = false;
      }
    });
    setState({ ...state, [stateKey]: value, [stateList]: newList });
  }
};

const ButtonWithTooltipAllowingDisable = ({
  disabled,
  onClick,
  icon,
  text
}: IButtonWithTooltipAllowingDisable) => {
  return disabled ? (
    <Button large minimal icon={icon} onClick={onClick} disabled={disabled} />
  ) : (
    <Tooltip usePortal hoverCloseDelay={0} content={text}>
      <Button large minimal icon={icon} onClick={onClick} disabled={disabled} />
    </Tooltip>
  );
};

export interface IButtonWithTooltipAllowingDisable {
  disabled: boolean;
  onClick: any;
  icon: IconName | JSX.Element;
  text: string;
}

const handleListSelection = (
  element: IItemsList,
  argList: IItemsList[],
  lastSelected: IItemsList | null,
  evt: any,
  query: string = ''
) => {
  let newList = cloneDeep(argList);
  if (!(evt.ctrlKey || evt.shiftKey)) {
    newList = newList.map(item => ({
      ...item,
      active: false
    }));
    newList.some((stateItem, index) => {
      const result = element.value === stateItem.value;
      if (result) {
        newList[index].active = true;
      }
      return result;
    });
  } else if (evt.ctrlKey) {
    newList.some((stateItem, index) => {
      const result = element.value === stateItem.value;
      if (result) {
        newList[index].active = !!element.active;
      }
      return result;
    });
  } else if (evt.shiftKey) {
    newList = newList.map(item => ({
      ...item,
      active: false
    }));
    let lastSelectedIndex = 0;
    let clickedElementIndex = -1;
    newList.forEach((stateItem, index) => {
      if (lastSelected && stateItem.value === lastSelected.value) {
        lastSelectedIndex = index;
      }
      if (element && stateItem.value === element.value) {
        clickedElementIndex = index;
      }
    });
    const start =
      lastSelectedIndex > clickedElementIndex
        ? lastSelectedIndex
        : clickedElementIndex;
    const end =
      lastSelectedIndex > clickedElementIndex
        ? clickedElementIndex
        : lastSelectedIndex;
    newList.forEach((stateItem, index) => {
      if (
        start >= index &&
        index >= end &&
        (!query ||
          newList[index].text.toUpperCase().includes(query.toUpperCase()))
      ) {
        newList[index].active = true;
      }
    });
  }
  return newList;
};
