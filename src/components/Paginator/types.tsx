import { CSSProperties, ReactNode } from 'react';
import { FieldState } from 'formstate';
import { IconName, MaybeElement } from '@blueprintjs/core';

export interface IInfoPage {
  totalPages: number;
  currentPage: number;
  totals: number;
}

export interface IItemsByPages {
  fieldState: FieldState<any>;
  options: any[];
  onChange: (value: any) => void;
  label?: string;
  color?: string;
}

export interface ILabels {
  itemsByPage?: string;
  renderInfoDetails?: (infoPage: IInfoPage) => ReactNode;
}

export interface IPaginatorStyle {
  pageSelectedBackgroundColor?: string;
  pageSelectedColor?: string;
  pageHoverBackgroundColor?: string;
  pageHoverColor?: string;
  iconLeft?: IconName | MaybeElement;
  iconRight?: IconName | MaybeElement;
  iconColor?: string;
}

export interface VPaginatorProps {
  totalRecords: any;
  pageLimit: number;
  pageNeighbours: number;
  currentPage: number;
  onPageChanged: (value: any) => void;
  itemsByPage?: { label: string; value: number }[];
  labels?: ILabels;
  hideInfoLabels?: boolean;
  hideItemsByPage?: boolean;
  style?: CSSProperties;
  customerStyle?: IPaginatorStyle;
}

export interface IState {
  currentPage: number;
}

export const LEFT_PAGE = 'LEFT';
export const RIGHT_PAGE = 'RIGHT';
