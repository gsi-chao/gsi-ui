import { IItem } from '../../types';
import { action, observable } from 'mobx';

export class SearchSelectStore {
  @observable isOpen: boolean = false;
  @observable selection: any = null;
  @observable options: IItem[] = [];
  @observable search: string = '';
  @observable invokeKeyPress: any = 'NONE';
  @observable hasChange: boolean = false;
  @observable popoverWidth: number;
  @observable enableFilter: boolean = false;
  constructor(popoverWidth: number) {
    this.popoverWidth = popoverWidth;
  }
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
}
