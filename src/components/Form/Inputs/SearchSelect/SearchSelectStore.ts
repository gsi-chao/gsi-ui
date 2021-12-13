import { IItem } from '../../types';
import { action, computed, observable } from 'mobx';
import { isArray } from 'lodash';

export class SearchSelectStore {
  @observable isOpen: boolean = false;
  @observable selection: any = null;
  @observable options: IItem[] = [];
  @observable search: string = '';
  @observable invokeKeyPress: any = 'NONE';
  @observable hasChange: boolean = false;
  @observable popoverWidth: number;
  @observable enableFilter: boolean = false;
  @observable showTooltip: boolean = false;
  constructor(popoverWidth: number) {
    this.popoverWidth = popoverWidth;
  }

  showTooltipWithDisabled = (disabled: boolean) => () => {
    if (disabled) {
      return;
    }
    this.setShowTooltip(true);
  };

  hideToolTip = () => {
    this.setShowTooltip();
  };

  @action setShowTooltip = (showTooltip: boolean = false) => {
    this.showTooltip = showTooltip;
  };
  @action setIsOpen = (isOpen: boolean) => {
    this.isOpen = isOpen;
  };
  handleIsOpen = (isOpen: boolean) => () => {
    this.setIsOpen(isOpen);
  };
  @action setSelection = (selection: any) => {
    this.selection = selection;
  };
  @action setOptions = (options: IItem[]) => {
    this.options = options;
  };
  @action setSearch = (search: string) => {
    this.search = search;
  };
  @action setInvokeKeyPress = (invokeKeyPress: any) => {
    this.invokeKeyPress = invokeKeyPress;
  };
  @action setHasChange = (hasChange: boolean) => {
    this.hasChange = hasChange;
  };
  @action setPopoverWidth = (popoverWidth: number) => {
    this.popoverWidth = popoverWidth;
  };
  @action setEnableFilter = (enableFilter: boolean) => {
    this.enableFilter = enableFilter;
  };

  @computed get arrayOfValues() {
    const displayValues: string[] = [];
    if (!isArray(this.selection) && this.selection) {
      const value = this.options.find(el => el.value === this.selection);
      value?.label && displayValues.push(value?.label);
    } else if (isArray(this.selection) && this.selection.length) {
      this.options.forEach(opt => {
        const value = this.selection.some((val: any) => val === opt.value);
        value && displayValues.push(opt?.label);
      });
      this.options.forEach(el => el.value === this.selection);
    }
    return displayValues;
  }

  @computed get displayTooltip() {
    return !!this.arrayOfValues.length && this.showTooltip && !this.isOpen;
  }
}
