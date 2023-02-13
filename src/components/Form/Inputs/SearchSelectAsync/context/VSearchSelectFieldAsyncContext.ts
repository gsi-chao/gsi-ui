import { createContext, MutableRefObject } from 'react';
import { IItem } from '../../../types';
import { LoadData } from '../VSearchSelectFieldAsync';

type VSearchSelectFieldAsyncContextType = {
  isOpen: boolean;
  options: IItem[];
  selection: any;
  loading: boolean;
  amountCharacterSearch: number;
  refInputSearch: MutableRefObject<any>;
  changePopoverView: (value: boolean) => void;
  selectDeselectItem: (value: any) => void;
  onSearchData: (params: LoadData) => void;
  onClearSearchData: () => void;
  onChangeFirstLoad: () => void;
};

export const VSearchSelectFieldAsyncContext = createContext<
  VSearchSelectFieldAsyncContextType
>({
  refInputSearch: { current: null },
  isOpen: false,
  loading: false,
  options: [],
  selection: '',
  amountCharacterSearch: 3,
  changePopoverView: () => {},
  selectDeselectItem: () => {},
  onSearchData: () => {},
  onClearSearchData: () => {},
  onChangeFirstLoad: () => {}
});
