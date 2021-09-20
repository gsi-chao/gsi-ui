import React, { useEffect, useMemo } from 'react';
import { TimePrecision } from '@blueprintjs/datetime';
import moment from 'moment';
import { observer, useLocalStore } from 'mobx-react';
import { CustomDateRangeV2Store } from './stores/CustomDateRangeV2Store';
import {
  DEFAULT_SHORTCUTS,
  IDateRangeShortcut,
  IVCustomDateRangeV2
} from './types/types';
import { StyledDateRange } from './styles/styles';

export const VCustomDateRangeV2 = observer((props: IVCustomDateRangeV2) => {
  const {
    defaultEndTimeWithEndDay,
    fieldState,
    format = 'MM/DD/YYYY',
    onChange,
    value,
    onChangeShortcut
  } = props;

  const {
    range,
    setIsChangedByDayPicker,
    isChangedByDayPicker,
    removePopoverDismiss,
    handleOnChange,
    handleChangeFromExterior,
    setShortcuts,
    setComponentRef
  } = useLocalStore(() => new CustomDateRangeV2Store(onChangeShortcut));

  const shortcuts: IDateRangeShortcut[] = useMemo(() => {
    setShortcuts(props.shortcuts || DEFAULT_SHORTCUTS);
    return props.shortcuts || DEFAULT_SHORTCUTS;
  }, [props.shortcuts]);

  const propsValue = useMemo(() => {
    return fieldState?.value || value;
  }, [fieldState?.value, value]);

  useEffect(() => {
    handleChangeFromExterior(propsValue, format);
  }, [propsValue]);

  const isUserDefined = useMemo(() => {
    if (!range[0] && !range[1]) {
      return true;
    }
    return !shortcuts.some(
      shortcut =>
        moment(shortcut.dateRange[0] || undefined).format(
          'MM/DD/YYYY hh:mm a'
        ) === moment(range[0] || undefined).format('MM/DD/YYYY hh:mm a') &&
        moment(shortcut.dateRange[1] || undefined).format(
          'MM/DD/YYYY hh:mm a'
        ) === moment(range[1] || undefined).format('MM/DD/YYYY hh:mm a')
    );
  }, [range]);

  const onDayMouseEnter = (day: Date | null) => {
    if (!isChangedByDayPicker) {
      setIsChangedByDayPicker(true)();
    }
  };

  const { timePickerProps, hasTimeProps } = useMemo(() => {
    const hasTimeProps = format?.toLowerCase()?.includes('hh');
    if (!hasTimeProps) {
      return {
        hasTimeProps,
        timePickerProps: undefined
      };
    }
    return {
      hasTimeProps,
      timePickerProps: {
        useAmPm: format === 'MM/DD/YYYY hh:mm a',
        onFocus: setIsChangedByDayPicker(false)
      }
    };
  }, [format]);

  return (
    <StyledDateRange
      ref={setComponentRef}
      isUserDefined={isUserDefined}
      allowSingleDayRange={true}
      timePrecision={hasTimeProps ? TimePrecision.MINUTE : undefined}
      {...momentFormatter(format)}
      shortcuts={shortcuts}
      closeOnSelection={false}
      value={range}
      onChange={handleOnChange(fieldState, onChange, defaultEndTimeWithEndDay)}
      popoverProps={{
        shouldReturnFocusOnClose: false,
        onOpened: removePopoverDismiss,
        minimal: true
      }}
      timePickerProps={timePickerProps}
      dayPickerProps={{
        onDayMouseEnter
      }}
      highlightCurrentDay
      endInputProps={{
        onFocus: setIsChangedByDayPicker(true),
        value: range?.[1] ? moment(range?.[1]).format(format) : ''
      }}
    />
  );
});

export default VCustomDateRangeV2;

const momentFormatter = (format: any) => {
  return {
    formatDate: (date: any) => moment(date).format(format),
    parseDate: (str: any) => moment(str, format).toDate(),
    placeholder: `${format} (moment)`
  };
};
