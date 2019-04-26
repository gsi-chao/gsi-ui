import { IconName } from '@blueprintjs/core';

export type ElevationType = 0 | 1 | 2 | 3 | 4;

export interface IItemsList {
  text: string;
  icon?: IconName | JSX.Element | false | null | undefined;
  value: string;
  active?: boolean;
}

export interface ISelectionListProps {
  padding?: string;
  elevation?: ElevationType;
  className?: string;
  elements: IItemsList[];
  onSelect(list: IItemsList): void;
  selection?: {
    textColor: string;
    background: string;
  };
}
