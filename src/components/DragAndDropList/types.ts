export interface IDNDItem{
  value: string;
  label: string;
}

export interface IDNDList{
  id: string;
  label?: string;
  list: IDNDItem[];
}