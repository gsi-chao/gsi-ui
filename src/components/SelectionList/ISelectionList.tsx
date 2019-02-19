import { IconName } from '@blueprintjs/core';

export interface IItemsList {
  text: string;
  icon?: IconName | JSX.Element | false | null | undefined;
  value: string;
  active?: boolean;
}

export interface ISelctionListProps {
  elements: IItemsList[];
  onSelect(list: IItemsList[]): void;
  header: {
    text: string;
    color?: string;
    textColor?: string;
  };
  selection?: {
    textColor: string;
    background: string;
  };
}
