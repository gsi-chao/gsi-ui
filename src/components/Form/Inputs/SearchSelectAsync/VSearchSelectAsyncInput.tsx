import { Button, Spinner } from '@blueprintjs/core';
import React, { forwardRef, useContext, useState } from 'react';
import { useThrottleDebounce } from '../../../CustomHooks';
import { VInputField } from '../InputField';
import { VSearchSelectFieldAsyncContext } from './context/VSearchSelectFieldAsyncContext';

export const VSearchSelectAsyncInput = forwardRef(
  ({ fill }: { fill?: boolean }, ref) => {
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
        id="search-select-input"
        value={search}
        onChange={onChange}
        leftIcon={'search'}
        placeholder={'Search...'}
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
