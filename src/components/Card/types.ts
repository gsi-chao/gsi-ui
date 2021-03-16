import { Elevation, IconName } from '@blueprintjs/core';

export type FlexJustify = 'center' | 'start' | 'end';
export type HeaderOrientation = 'row' | 'row-reverse';

export interface StyledVCardProps {
  noHeader?: boolean;
  headerText?: string;
  children?: any;
  headerIcon?: any;
  headerBackgroundColor?: any;
  backgroundColor?: any;
  headerColor?: any;
  headerHorizontalAlign?: FlexJustify;
  cardElevation?: Elevation;
  height?: string;
  width?: string;
  collapse?: boolean;
  transitionDuration?: number;
  bodyPadding?: string;
  keepChildrenMounted?: boolean;
  openIcon?: IconName;
  closeIcon?: IconName;
  headerOrientation?: HeaderOrientation;
  headerTextJustify?: FlexJustify;
  headerTextUppercase?: boolean;
  headerTextBold?: boolean;
  className?: string;
  defaultActive?: boolean;
  headerCustomComponent?: any;
  heigthHeaderPx?: number;
  headerCustomButton?: any;
  onHeaderMouseDrag?: any;
  onHeaderFocus?: any;
  id?: string;
  headerTextComponent?: any;
  headerClass?: string;
}
