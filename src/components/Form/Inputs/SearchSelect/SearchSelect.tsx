import React, { useEffect, useRef, useState } from 'react';
import { cloneDeep, isArray, orderBy, remove, find } from 'lodash';
import {
  InputGroup,
  Keys,
  Popover,
  PopoverInteractionKind
} from '@blueprintjs/core';

import { IItem } from '../../types';
import { SearchSelectItems } from './SearchSelectItems';
import { SelectSelectionInfo } from './SelectSelectionInfo';

interface IProps {
  value: any;
  multi?: boolean;
  allowNewItem?: boolean;
  onAddNewItem?: (value: string) => void;
  options: IItem[];
  onChange?: (value: any) => void;
  sort?: 'asc' | 'desc' | undefined;
  popoverWidth?: number;
  fixedInputWidthPx?: number;
  disabled?: boolean;
  allowEmpty?: boolean;
}

export const SearchSelect = (props: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<any>(null);
  const [options, setOptions] = useState<IItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [invokeKeyPress, setInvokeKeyPress] = useState<any>('NONE');
  const [popoverWidth, setPopoverWidth] = useState<number>(
    props.popoverWidth || props.fixedInputWidthPx || 150
  );
  const [enableFilter, setEnableFilter] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const findOptionsValue = (options: IItem[], value: number | string): any => {
    return find(options, (v: IItem) => v.value.toString() === value.toString());
  };
  useEffect(() => {
    if (props.multi && !isArray(props.value)) {
      throw new Error('Multi Select value must be an array');
    }
    if (!props.multi) {
      const option = findOptionsValue(props.options, props.value);

      option
        ? setSearch(option.label.toString())
        : setSearch(props.value.toString());
    }
    setSelection(props.value);
  }, [props.value]);

  useEffect(() => {
    props.popoverWidth && setPopoverWidth(props.popoverWidth);
  }, [props.popoverWidth]);

  useEffect(() => {
    let w = 150;
    let opt = props.options.filter((value: IItem) => {
      const factor = !props.multi ? 6.5 : 7.8;
      const lw = value.label.toString().length * factor;
      if (lw > w) {
        w = lw;
      }
      return (
        value.value
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1 ||
        value.label
          .toString()
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1 ||
        !enableFilter
      );
    });
    if (props.sort) {
      opt = orderBy(opt, ['label'], [props.sort]);
    }
    setOptions(opt);
    !props.popoverWidth && setPopoverWidth(w + 20);
  }, [props.options, search]);

  const onSearchChange = (e: any) => {
    !isOpen && setIsOpen(true);
    setEnableFilter(true);
    setSearch(e.target.value);
  };

  const setSearchSelectionText = (value: string | number) => {
    const option = findOptionsValue(props.options, value);

    option ? setSearch(option.label.toString()) : setSearch(value.toString());
  };

  const handleInteraction = (nextOpenState: boolean, e?: any) => {
    try {
      if (e && !props.disabled) {
        // when user click on the input or caret
        if (
          e.target.parentNode?.className?.indexOf('gsi-input-select') !== -1 ||
          e.target.parentNode?.className?.indexOf('gsi-selection-caret') !== -1
        ) {
          setIsOpen(nextOpenState);
          !nextOpenState && props.onChange && props.onChange(selection);
          !props.multi && selection && setSearchSelectionText(selection);
          return;
        }
        // when user click on the select info section.
        if (e.target.className.indexOf('gsi-selection-info-deselect') !== -1) {
          setIsOpen(false);
          return;
        }
        // when user click on the popover
        if (
          e.currentTarget.className &&
          e.currentTarget?.className?.indexOf('gsi-select-popover') !== -1
        ) {
          setIsOpen(props.multi ? props.multi : false);
          return;
        }
      }
      !props.disabled && setIsOpen(nextOpenState);
      !nextOpenState && props.onChange && props.onChange(selection);
      props.multi && setSearch('');
      !props.multi && selection && setSearchSelectionText(selection);
      !props.multi && options.length === 0 && setSearch('');
    } catch (e) {
      !props.disabled && setIsOpen(nextOpenState);
      !nextOpenState && props.onChange && props.onChange(selection);
    }
  };

  const deselectAllItems = () => {
    setSelection([]);
    props.onChange && props.onChange([]);
  };

  const selectDeselectItem = (value: IItem) => {
    if (props.multi && isArray(selection)) {
      const selected = cloneDeep(selection);
      if (selection.includes(value.value)) {
        remove(selected, val => val === value.value);
      } else {
        selected.push(value.value);
      }

      setSelection(selected);
    } else {
      setSelection(value.value);
      setEnableFilter(false);
    }
    inputRef.current && inputRef.current.focus();
    !props.multi && setSearch(value.label.toString());
  };

  const getSelectionLength = () => {
    if (props.multi && isArray(selection)) {
      return selection.length;
    }
    return 0;
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    const { keyCode } = e;

    if (
      keyCode === Keys.ARROW_UP ||
      keyCode === Keys.ARROW_DOWN ||
      keyCode === Keys.ENTER
    ) {
      setInvokeKeyPress(keyCode);
      setTimeout(() => {
        setInvokeKeyPress('NONE');
      }, 10);
    }
  };

  const onAddNewItem = () => {
    props.onAddNewItem && props.onAddNewItem(search);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <Popover
      targetClassName={'gsi-select-popover'}
      popoverClassName={'bp3-select-popover gsi-select-popover'}
      enforceFocus={false}
      isOpen={isOpen}
      canEscapeKeyClose={true}
      captureDismiss={true}
      interactionKind={PopoverInteractionKind.CLICK}
      modifiers={{
        flip: { enabled: true },
        keepTogether: { enabled: true },
        preventOverflow: { enabled: true }
      }}
      onInteraction={handleInteraction}
    >
      <div onKeyUpCapture={onKeyPress}>
        <InputGroup
          inputRef={ref => (inputRef.current = ref)}
          autoFocus={false}
          className={'gsi-input-select'}
          disabled={props.disabled}
          rightElement={
            <SelectSelectionInfo
              disabled={props.disabled ? props.disabled : false}
              count={getSelectionLength()}
              multi={!!props.multi}
              deselectAllItems={deselectAllItems}
            />
          }
          onChange={onSearchChange}
          placeholder={'Search Items'}
          value={search}
        />
      </div>
      <div
        style={{
          width: popoverWidth,
          position: 'relative'
        }}
        onKeyUpCapture={onKeyPress}
      >
        <SearchSelectItems
          options={options}
          multi={props.multi}
          selection={selection}
          selectDeselectItem={selectDeselectItem}
          invokeKeyPress={invokeKeyPress}
          search={search}
          allowNewItem={!!props.allowNewItem}
          onAddNewItem={onAddNewItem}
          allowEmpty={props.allowEmpty}
        />
      </div>
    </Popover>
  );
};
