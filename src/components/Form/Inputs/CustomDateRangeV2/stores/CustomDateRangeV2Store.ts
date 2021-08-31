import { action, observable } from 'mobx';
import moment from 'moment';
import { FieldState } from 'formstate';
import { FormatType, IDateRangeShortcut } from '../types/types';
import { DateRange, DateRangeInput } from '@blueprintjs/datetime';

export class CustomDateRangeV2Store {
  @observable range: DateRange = [null, null];
  @observable isChangedByDayPicker: boolean = false;
  @observable shortcuts: IDateRangeShortcut[] = [];
  @observable onChangeShortcut?: (shortcut: IDateRangeShortcut) => void;
  @observable componentRef?: DateRangeInput | null = null;

  constructor(onChangeShortcut?: (shortcut: IDateRangeShortcut) => void) {
    this.onChangeShortcut = onChangeShortcut;
  }

  @action setComponentRef = (ref: DateRangeInput) => {
    this.componentRef = ref;
  };

  @action setShortcuts = (value: IDateRangeShortcut[]) => {
    this.shortcuts = value;
  };

  @action setRange = (value: DateRange) => {
    this.shortcuts?.some((sh, index) => {
      const result = areEqualsDateRanges(sh?.dateRange, value);
      if (result) {
        this.componentRef?.setState({
          selectedShortcutIndex: index
        });
      }
      return result;
    });
    this.range = value;
  };

  @action setIsChangedByDayPicker = (value: boolean) => () => {
    this.isChangedByDayPicker = value;
  };

  formatDate = (format: FormatType) => (date: Date) => {
    const isStartDate = this.componentRef?.state?.boundaryToModify === 'start';
    const dateFormValue = isStartDate ? this.range?.[0] : this.range?.[1];
    let formatValue = dateFormValue
      ? moment(dateFormValue)?.format('hh:mm a')
      : '12:00 am';
    if (formatValue === '12:00 am' && !isStartDate) {
      formatValue = '11:59 pm';
    }
    const finalDate = moment(
      `${moment(date)?.format('MM/DD/YYYY')} ${formatValue}`
    );
    return moment(finalDate).format(format);
  };

  handleOnChange = (
    fieldState?: FieldState<DateRange>,
    onChange?: (value: DateRange) => void,
    defaultEndTimeWithEndDay?: boolean
  ) => (val: DateRange) => {
    this.removePopoverDismiss();
    console.log(val);
    if (
      defaultEndTimeWithEndDay &&
      this.isChangedByDayPicker &&
      val[1] &&
      moment(val[1]).format('hh:mm a') === '12:00 am'
    ) {
      val[1] = moment(
        `${moment(val[1]).format('MM/DD/YYYY')} 11:59 pm`
      ).toDate();
    }
    fieldState?.onChange(val);
    onChange?.(val);
    this.componentRef?.startInputElement?.setAttribute?.(
      'value',
      'esto es la polla chaval'
    );
    this.setRange(val);
  };

  removePopoverDismiss = () => {
    const shortcuts = document.querySelectorAll(
      '.bp3-daterangepicker-shortcuts li .bp3-menu-item'
    );

    shortcuts.forEach(shortcut => {
      shortcut.classList.remove('bp3-popover-dismiss');
      shortcut.addEventListener(
        'click',
        this.handleChangeShortcut(shortcut?.textContent || '')
      );
    });
  };

  handleChangeFromExterior = (
    value: DateRange = [null, null],
    format: FormatType = 'MM/DD/YYYY'
  ) => {
    if (!areEqualsDateRanges(value, this.range, format)) {
      this.setRange(value);
    }
  };

  handleChangeShortcut = (text?: string) => () => {
    if (text) {
      const shortcut = this.shortcuts?.find(sh => sh.label === text);
      if (shortcut && this.onChangeShortcut) {
        this.onChangeShortcut(shortcut);
      }
    }
  };
}

const areEqualsDateRanges = (
  range1: [Date | null, Date | null],
  range2: [Date | null, Date | null],
  format: FormatType = 'MM/DD/YYYY'
) => {
  if (!range1.some(date => date) && !range2.some(date => date)) {
    return true;
  }
  if (!range1[0] || !range2[0]) {
    return false;
  }
  if (!range1[1] || !range2[1]) {
    return false;
  }
  return (
    moment(range1[0]).format(format) === moment(range2[0]).format(format) &&
    moment(range1[1]).format(format) === moment(range2[1]).format(format)
  );
};
