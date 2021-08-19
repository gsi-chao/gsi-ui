import React, { useCallback, useEffect, useState } from 'react';
import { Keys, Menu, MenuItem } from '@blueprintjs/core';
import {
  isArray,
  findIndex,
  isNil,
  get,
  LoDashExplicitNumberArrayWrapper
} from 'lodash';
import VirtualList from 'react-tiny-virtual-list';

import { IItem } from '../../types';
import { SelectItemCheckbox } from './styled';

interface IProps {
  options: IItem[];
  selection: any;
  multi?: boolean;
  selectDeselectItem: (value: IItem) => void;
  invokeKeyPress?: number | 'NONE';
  allowNewItem?: boolean;
  onAddNewItem?: () => void;
  search: string;
  allowEmpty?: boolean;
  onKeyPressed?: () => void;
  displayAsTree?: boolean;
  treeChildIndentWidth?: number;
}

export const SearchSelectItems = (props: IProps) => {
  const [active, setActive] = useState<any>(null);
  const [isKeyUpOrDownPressed, setIsKeyUpOrDownPressed] = useState<boolean>(
    false
  );

  const findOptionsIndexValue = (
    options: IItem[],
    value: number | string
  ): any => {
    return findIndex(
      options,
      (v: IItem) =>
        !isNil(v?.value) &&
        !isNil(value) &&
        v.value.toString() === value.toString()
    );
  };

  useEffect(() => {
    if (props.invokeKeyPress !== 'NONE') {
      switch (props.invokeKeyPress) {
        case Keys.ARROW_DOWN:
          onKeyDown();
          break;
        case Keys.ARROW_UP:
          onKeyUp();
          break;
        case Keys.DELETE:
          setIsKeyUpOrDownPressed(false);
          props.allowEmpty && props.multi && setActive(-1);
          props.onKeyPressed && props.onKeyPressed();

          break;
        case Keys.ENTER:
          if (props.options[active]) {
            props.selectDeselectItem(props.options[active]);
          }
          props.onKeyPressed && props.onKeyPressed();
      }
    }
  }, [props.invokeKeyPress]);

  useEffect(() => {
    const index = findOptionsIndexValue(props.options, props.selection);
    setActive(index);
  }, [props.selection, props.options]);

  const onKeyUp = () => {
    active === 0 ? setActive(props.options.length - 1) : setActive(active - 1);
    setIsKeyUpOrDownPressed(true);
  };

  const onKeyDown = () => {
    active === props.options.length - 1 ? setActive(0) : setActive(active + 1);
    setIsKeyUpOrDownPressed(true);
  };

  const getSelectedLabel = (option: any, index: number) => {
    if (props.multi && isArray(props.selection)) {
      const { value } = option;
      return (
        <SelectItemCheckbox
          checked={props.selection.includes(value)}
          onClick={e => {
            e.preventDefault();
            setActive(index);
            props.selectDeselectItem(option);
          }}
        />
      );
    }
    return null;
  };

  const getVirtualHeight = useCallback(() => {
    return props.options.length > 4 ? 150 : 30 * props.options.length + 1;
  }, [props.options]);

  return (
    <Menu>
      {props.allowEmpty && !props.multi && (
        <MenuItem
          active={
            !isKeyUpOrDownPressed && (active === -1 || props.selection === '')
          }
          className={'select-item'}
          text={'No Selection'}
          onClick={() => props.selectDeselectItem({ value: '', label: '' })}
        />
      )}
      {props.options.length > 0 ? (
        <VirtualList
          scrollToIndex={
            props.selection.length > 1
              ? findOptionsIndexValue(props.options, props.selection[0])
              : active
          }
          width="100%"
          height={getVirtualHeight()}
          itemCount={props.options.length}
          itemSize={30} // Also supports variable heights (array or function getter)
          renderItem={({ index, style }) => (
            <MenuItem
              style={{
                ...(props.displayAsTree && {
                  paddingLeft:
                    props.displayAsTree &&
                    get(props.options, `[${index}].isParent`, false)
                      ? '7px'
                      : props?.treeChildIndentWidth ?? '30px'
                }),
                ...style
              }}
              active={index === active}
              key={index}
              className={'select-item'}
              icon={props.options[index].icon}
              text={props.options[index].label}
              labelElement={getSelectedLabel(props.options[index], index)}
              onClick={(e: any) => {
                e.preventDefault();
                props.selectDeselectItem(props.options[index]);
              }}
            />
          )}
        />
      ) : props.allowNewItem ? (
        <MenuItem
          text={`Create ${props.search}`}
          icon={'add'}
          onClick={() => props.onAddNewItem && props.onAddNewItem()}
        />
      ) : (
        <MenuItem text={'No results.'} disabled />
      )}
    </Menu>
  );
};
