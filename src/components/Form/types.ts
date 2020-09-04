import { IconName } from '@blueprintjs/icons';

export interface IItem {
  value: any;
  label: string;
  rep?: string;
  icon?: IconName;
  isParent?: boolean;
}
