import { Button, Spinner } from '@blueprintjs/core';
import React, { forwardRef, useContext, useState } from 'react';
import { useThrottleDebounce } from '../../../CustomHooks';
import { VInputField } from '../InputField';
import { VSearchSelectFieldAsyncContext } from './context/VSearchSelectFieldAsyncContext';

type VSearchSelectAsyncInputProps = {
  id: string;
  fill?: boolean;
  placeholder?: string;
  suppessLeftIcon?: boolean;
};

export const VSearchSelectAsyncInput = forwardRef(
  (
    { id, fill, placeholder, suppessLeftIcon }: VSearchSelectAsyncInputProps,
    ref
  ) => {
    const {
      loading,
      amountCharacterSearch,
      onSearchData,
      onChangeFirstLoad,
      onClearSearchData
    } = useContext(VSearchSelectFieldAsyncContext);

    const [search, setSearch] = useState('');
    const tbFunc = useThrottleDebounce(1000, 500);

    const onChange = (value: string) => {
      setSearch(value);
      onChangeFirstLoad();
      const filter = () => onSearchData({ search: value, firstLoad: false });
      value.length >= amountCharacterSearch && tbFunc(filter);
    };

    const onClear = () => {
      setSearch('');
      onClearSearchData();
    };

    return (
      <VInputField
        {...{ fill }}
        inputRef={ref}
        id={`search-select-input-${id}`}
        key={`search-select-input-${id}`}
        value={search}
        onChange={onChange}
        {...(!suppessLeftIcon && { leftIcon: 'search' })}
        placeholder={placeholder ?? 'Search...'}
        rightElement={
          loading ? (
            <Spinner size={Spinner.SIZE_SMALL} />
          ) : (
            <Button icon={'filter-remove'} onClick={onClear} minimal small />
          )
        }
      />
    );
  }
);
