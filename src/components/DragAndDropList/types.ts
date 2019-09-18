export interface IDNDItem {
  value: string;
  label: string;
}

export interface IDNDList {
  id: string;
  label?: string;
  list: IDNDItem[];
  allowFilter?: boolean;
  width?: string;
  height?: string;
  headerColor?: string;
  headerBackgroundColor?: string;
}
