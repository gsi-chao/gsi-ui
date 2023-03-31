import { isArray } from 'lodash';
import { abort } from 'process';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IItem } from '../../../types';
import { Validators } from '../../../Validators';
import {
  LoadData,
  VSearchSelectFieldAsyncProps
} from '../VSearchSelectFieldAsync';

export const useSearchSelectFieldAsync = ({
  multi,
  disabled,
  required,
  validators,
  fieldState,
  isLoading,
  value,
  onChange,
  onLoadData,
  allowFirstLoad
}: Partial<VSearchSelectFieldAsyncProps>) => {
  const refInputSearch = useRef<HTMLInputElement>();
  const firstLoadChange = useRef<boolean>(false);
  const [options, setOptions] = useState<IItem[]>([]);
  const [isOpen, changePopoverView] = useState(false);
  const [loading, changeLoading] = useState(false);
  const [selection, setSelection] = useState<any[] | any>(multi ? [] : '');
  const controller = new AbortController();
  const { signal } = controller;

  const isDisabledPopover = !!(disabled || isLoading);

  useEffect(() => onClearComponent, []);

  useEffect(() => {
    if (fieldState) {
      if (required) {
        if (validators && validators.length > 0) {
          fieldState.validators(Validators.required, ...validators);
        } else {
          fieldState.validators(Validators.required);
        }
      } else if (validators && validators.length > 0) {
        fieldState.validators(...validators);
      }
    }
  }, [validators]);

  useEffect(() => {
    (!firstLoadChange.current || allowFirstLoad) && onFirstLoad();
  }, [fieldState?.value, value]);

  const count = useMemo(() => {
    if (multi && isArray(selection)) return selection.length;
    return 0;
  }, [selection, multi]);

  const text = useMemo(() => {
    if (count > 1) return '';

    if (!multi) {
      return (
        options.find(({ value: valueItem }) => {
          if (fieldState) return valueItem === fieldState.value;
          return valueItem === value;
        })?.label ?? ''
      );
    }

    return (
      options.find(({ value: valueItem }) => {
        if (fieldState) {
          return (
            isArray(fieldState.value) && fieldState.value.includes(valueItem)
          );
        }
        return isArray(value) && value.includes(valueItem);
      })?.label ?? ''
    );
  }, [fieldState?.value, value, options]);

  const onFirstLoad = async (load?: unknown) => {
    const search = load ?? getValueFirstLoad();
    if (!!search) {
      await onSearchData({ search, firstLoad: true });
      if (!signal.aborted) {
        firstLoadChange.current = true;
        setSelection(search);
      }
      return;
    }
  };

  const getValueFirstLoad = () => {
    if (multi) {
      if (
        fieldState?.value &&
        isArray(fieldState.value) &&
        fieldState.value.length
      ) {
        return fieldState.value;
      }

      if (value && isArray(value) && value.length) {
        return value;
      }

      return null;
    }

    if (!!fieldState?.value && !isArray(fieldState.value)) {
      return fieldState.value;
    }

    if (!!value && !isArray(value)) return value;

    return null;
  };

  const isValue = useMemo(() => !!getValueFirstLoad(), [
    fieldState?.value,
    value,
    options
  ]);

  const onOpeningPopover = () => {
    refInputSearch.current?.focus?.();
  };

  const onTogglePopover = () => {
    if (!disabled && !(loading || isLoading)) {
      changePopoverView(!isOpen);
    }
  };

  const selectDeselectItem = (item: IItem) => {
    if (multi && isArray(selection)) {
      if (selection.includes(item.value)) {
        setSelection(selection.filter(value => value !== item.value));
      } else {
        setSelection((current: unknown[]) => [...current, item.value]);
      }
      return;
    }

    setSelection(item.value);
  };

  const handleInteraction = async (nextOpenState: boolean, e?: any) => {
    if (!!e && !disabled && !signal.aborted) {
      if (
        e.target?.parentNode?.className?.indexOf('gsi-input-select') !== -1 ||
        e.target?.parentNode?.className?.indexOf('gsi-selection-caret') !== -1
      ) {
        changePopoverView(nextOpenState);
      }

      if (
        e.target?.className?.indexOf?.('gsi-selection-info-deselect') !== -1
      ) {
        changePopoverView(false);
        return;
      }

      if (
        e.currentTarget?.className &&
        e.currentTarget?.className?.indexOf('gsi-select-popover') !== -1 &&
        multi
      ) {
        changePopoverView(true);
        return;
      }
    }

    !disabled && changePopoverView(nextOpenState);
    if (!nextOpenState) {
      changeValueOrField(selection);
      await fieldState?.validate?.();
    } else {
      fieldState?.setError('');
    }
  };

  const changeValueOrField = async (value: any) => {
    if (fieldState) {
      fieldState.onChange(value);
    }
    onChange?.(value);
  };

  const onSearchData = async (params: LoadData) => {
    changeLoading(true);
    const data = (await onLoadData?.(params)) ?? [];
    setOptions(data);
    changeLoading(false);
  };

  const onClearSearchData = () => setOptions([]);

  const deselectAllItems = () => {
    setSelection([]);
    changeValueOrField([]);
  };

  const onClearComponent = () => {
    firstLoadChange.current = false;
    setOptions([]);
    setSelection(multi ? [] : '');
    changeLoading(false);
    changePopoverView(false);
    controller.abort();
  };

  const onChangeFirstLoad = () => {
    firstLoadChange.current = true;
  };

  return {
    text,
    count,
    isOpen,
    isValue,
    loading,
    options,
    selection,
    refInputSearch,
    isDisabledPopover,
    onSearchData,
    onTogglePopover,
    deselectAllItems,
    onOpeningPopover,
    onClearSearchData,
    onChangeFirstLoad,
    changePopoverView,
    handleInteraction,
    selectDeselectItem
  };
};
