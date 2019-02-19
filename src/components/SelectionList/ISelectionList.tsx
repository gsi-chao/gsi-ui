import { IconName } from '@blueprintjs/core';

export interface IItemsList {
  text: string;
  icon?: IconName | JSX.Element | false | null | undefined;
  value: string;
  active?: boolean;
}

export interface ISelectionListProps {
  elements: IItemsList[];
  onSelect(list: IItemsList[]): void;
  selection?: {
    textColor: string;
    background: string;
  };
}
