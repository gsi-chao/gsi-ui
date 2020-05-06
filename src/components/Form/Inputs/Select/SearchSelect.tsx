import React, {
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { remove, isArray, cloneDeep } from 'lodash';
import {
  Classes,
  Icon,
  InputGroup,
  Keys,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Tag
} from '@blueprintjs/core';
import { IItem } from '../../types';
import { SearchSelectItems } from './SearchSelectItems';
import { SelectInputGroup } from './styled';

interface IProps {
  value: any;
  multi?: boolean;
  options: IItem[];
  onChange?: (value: any) => void;
}

export const SearchSelect = (props: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<any>(null);
  const [options, setOptions] = useState<IItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [invokeKeyPress, setInvokeKeyPress] = useState<any>('NONE');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (props.multi && !isArray(props.value)) {
      throw new Error('Multi Select value must be an array');
    }
    setSelection(props.value);
  }, [props.value]);

  useEffect(() => {
    setOptions(
      props.options.filter(
        (value: IItem) =>
          value.value
            .toString()
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1 ||
          value.label
            .toString()
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
      )
    );
  }, [props.options, search]);

  const onChange = (e: any) => {
    !isOpen && setIsOpen(true);
    setSearch(e.target.value);
  };

  const handleInteraction = (nextOpenState: boolean, e?: any) => {
    if (e) {
      if (e.target.className.indexOf('gsi-selection-info') !== -1) {
        setIsOpen(false);
        return;
      }
      console.log(e.currentTarget?.className);
      if (
        e.currentTarget.className &&
        e.currentTarget?.className?.indexOf('gsi-select-popover') !== -1
      ) {
        setIsOpen(props.multi ? props.multi : false);
        return;
      }
    }
    setIsOpen(nextOpenState);
  };

  const deselectAllItems = () => {
    setSelection([]);
    props.onChange && props.onChange([]);
  };

  const selectDeselectItem = (value: any) => {
    if (props.multi && isArray(selection)) {
      const selected = cloneDeep(selection);
      if (selection.includes(value)) {
        remove(selected, val => val === value);
      } else {
        selected.push(value);
      }

      setSelection(selected);
      props.onChange && props.onChange(selected);
    } else {
      setSelection(value);
      props.onChange && props.onChange(value);
    }
    console.log(inputRef);
    inputRef.current && inputRef.current.focus();
    
  };

  const getSelectionLabels = () => {
    if (getSelectionLength() > 0) {
      return (
        <span className={'bp3-tag  bp3-minimal gsi-selection-info'}>
          {`${selection.length} Selected`}{' '}
          <span
            style={{ padding: '0 5px', fontWeight: 'bold', cursor: 'pointer' }}
            className={'gsi-selection-info'}
            children={'X'}
            onClick={deselectAllItems}
          />
        </span>
      );
    }
    return (
      <span
        style={{ paddingRight: 15 }}
        className={'bp3-tag  bp3-minimal selection-info'}
      >
        No Selection
      </span>
    );
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
          // disabled={disabled}
          // large={large}
          rightElement={getSelectionLabels()}
          onChange={onChange}
          placeholder="Search Items"
          value={search}
        />
      </div>
      <div onKeyUpCapture={onKeyPress}>
        <SearchSelectItems
          options={options}
          multi={props.multi}
          selection={selection}
          selectDeselectItem={selectDeselectItem}
          invokeKeyPress={invokeKeyPress}
        />
      </div>
    </Popover>
  );
};
