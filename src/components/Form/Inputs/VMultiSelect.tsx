import React, { PropsWithChildren } from 'react';

import {
  Classes as CoreClasses,
  DISPLAYNAME_PREFIX,
  Keys,
  Popover as WPopover,
  Position,
  TagInput,
  TagInputAddMethod,
  Utils
} from '@blueprintjs/core';
import {
  Classes,
  IMultiSelectProps,
  IMultiSelectState,
  IQueryListRendererProps,
  QueryList
} from '@blueprintjs/select';
import { invoke } from 'lodash';

const Popover: PropsWithChildren<any> = WPopover;

export interface IVMultiSelectProps<T> extends IMultiSelectProps<T> {
  resetOnClose?: boolean;
}

export class VMultiSelect<T> extends React.PureComponent<
  IVMultiSelectProps<T>,
  IMultiSelectState
> {
  public static displayName = `${DISPLAYNAME_PREFIX}.MultiSelect`;
  public static defaultProps = { fill: false, placeholder: 'Search...' };

  public static ofType<T>() {
    return VMultiSelect as new (props: IMultiSelectProps<T>) => VMultiSelect<T>;
  }

  public state: IMultiSelectState = {
    isOpen: (this.props.popoverProps && this.props.popoverProps.isOpen) || false
  };

  private TypedQueryList = QueryList.ofType<T>();
  private input: HTMLInputElement | null = null;
  private queryList: QueryList<T> | null = null;
  private refHandlers = {
    input: (ref: HTMLInputElement | null) => {
      this.input = ref;
      this.props?.tagInputProps &&
        invoke(this.props.tagInputProps, 'inputRef', ref);
    },
    queryList: (ref: QueryList<T> | null) => (this.queryList = ref)
  };

  public render() {
    const {
      openOnKeyDown,
      popoverProps,
      tagInputProps,
      ...restProps
    } = this.props;

    return (
      <this.TypedQueryList
        {...restProps}
        onItemSelect={this.handleItemSelect}
        onQueryChange={this.handleQueryChange}
        ref={this.refHandlers.queryList}
        renderer={this.renderQueryList}
      />
    );
  }

  private renderQueryList = (listProps: IQueryListRendererProps<T>) => {
    const {
      fill,
      tagInputProps = {},
      popoverProps = {},
      selectedItems = [],
      placeholder
    } = this.props;
    const { handlePaste, handleKeyDown, handleKeyUp } = listProps;

    if (fill) {
      popoverProps.fill = true;
      tagInputProps.fill = true;
    }

    const { inputProps = {} } = tagInputProps;
    inputProps.className = `${inputProps.className} ${Classes.MULTISELECT_TAG_INPUT_INPUT}`;

    const handleTagInputAdd = (values: any[], method: TagInputAddMethod) =>
      method === 'paste' && handlePaste(values);

    return (
      <Popover
        autoFocus={false}
        canEscapeKeyClose={true}
        enforceFocus={false}
        isOpen={this.state.isOpen}
        position={Position.BOTTOM_LEFT}
        {...popoverProps}
        shouldReturnFocusOnClose={false}
        className={`${listProps.className} ${popoverProps.className}`}
        onInteraction={this.handlePopoverInteraction}
        popoverClassName={`${Classes.MULTISELECT_POPOVER} ${popoverProps.popoverClassName}`}
        onOpened={this.handlePopoverOpened}
      >
        <div
          onKeyDown={this.getTagInputKeyDownHandler(handleKeyDown)}
          onKeyUp={this.getTagInputKeyUpHandler(handleKeyUp)}
        >
          <TagInput
            placeholder={placeholder}
            {...tagInputProps}
            className={`${Classes.MULTISELECT} ${tagInputProps.className}`}
            inputRef={this.refHandlers.input}
            inputProps={inputProps}
            inputValue={listProps.query}
            onAdd={handleTagInputAdd}
            onInputChange={listProps.handleQueryChange}
            values={selectedItems.map(this.props.tagRenderer)}
          />
        </div>
        <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
          {listProps.itemList}
        </div>
      </Popover>
    );
  };

  private handleItemSelect = (
    item: T,
    evt?: React.SyntheticEvent<HTMLElement>
  ) => {
    this.input?.focus();
    Utils.safeInvoke(this.props.onItemSelect, item, evt);
  };

  private handleQueryChange = (
    query: string,
    evt?: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ isOpen: query.length > 0 || !this.props.openOnKeyDown });
    Utils.safeInvoke(this.props.onQueryChange, query, evt);
  };

  private handlePopoverInteraction = (nextOpenState: boolean) =>
    requestAnimationFrame(() => {
      if (this.input != null && this.input !== document.activeElement) {
        this.setState({ isOpen: false });
      } else if (!this.props.openOnKeyDown) {
        this.setState({ isOpen: true });
      }
      Utils.safeInvokeMember(
        this.props.popoverProps,
        'onInteraction',
        nextOpenState
      );
    });

  private handlePopoverOpened = (node: HTMLElement) => {
    this.queryList?.scrollActiveItemIntoView();
    if (this.props.resetOnClose) {
      this.queryList?.setQuery('', true);
    }
    Utils.safeInvokeMember(this.props.popoverProps, 'onOpened', node);
  };

  private getTagInputKeyDownHandler = (
    handleQueryListKeyDown: React.KeyboardEventHandler<HTMLElement>
  ) => (e: React.KeyboardEvent<HTMLElement>) => {
    const { which } = e;

    if (which === Keys.ESCAPE || which === Keys.TAB) {
      this.input?.blur();
      this.setState({ isOpen: false });
    } else if (
      !(
        which === Keys.BACKSPACE ||
        which === Keys.ARROW_LEFT ||
        which === Keys.ARROW_RIGHT
      )
    ) {
      this.setState({ isOpen: true });
    }

    const isTargetingTagRemoveButton =
      (e.target as HTMLElement).closest(`.${CoreClasses.TAG_REMOVE}`) != null;

    if (this.state.isOpen && !isTargetingTagRemoveButton) {
      Utils.safeInvoke(handleQueryListKeyDown, e);
    }
  };

  private getTagInputKeyUpHandler = (
    handleQueryListKeyUp: React.KeyboardEventHandler<HTMLElement>
  ) => (e: React.KeyboardEvent<HTMLElement>) => {
    const isTargetingInput = (e.target as HTMLElement).classList.contains(
      Classes.MULTISELECT_TAG_INPUT_INPUT
    );
    if (this.state.isOpen && isTargetingInput) {
      Utils.safeInvoke(handleQueryListKeyUp, e);
    }
  };
}
