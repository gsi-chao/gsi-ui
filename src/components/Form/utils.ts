import { FormState } from 'formstate';
import { cloneDeep, find, findIndex } from 'lodash';
import { IItem } from './types';

export const patchFormValues = (form: FormState<any>, object: any) => {
  const obj = cloneDeep(object);
  Object.keys(obj).map((key: string) => {
    if (form.$[key]) {
      form.$[key].onChange(obj[key]);
    }
  });
};

export const getFormValue = (form: FormState<any>) => {
  const returnedValue: any = {};
  Object.keys(form.$).map(key => {
    if (form.$[key] instanceof FormState) {
      returnedValue[key] = getFormValue(form.$[key]);
    } else {
      returnedValue[key] = form.$[key].value;
    }
  });
  return returnedValue;
};

export const validateAndGetObject = (entity: object, keyMap: string): any => {
  let value: any = Object.assign({}, entity);
  keyMap.split('.').map(key => {
    value = value && value[key];
  });
  return value;
};

export const validateAndGetArray = (entity: object, keyMap: string): any => {
  let value: any = Object.assign({}, entity);
  keyMap.split('.').map(key => {
    value = value && value[key];
  });

  if (value) {
    if (value.length > 0) {
      return value;
    }
  }
  return [];
};

export const replaceAll = (
  value: string,
  replaceValue: string,
  replaceWith: string
) => {
  let newValue = value;
  while (newValue.includes(replaceValue)) {
    newValue = newValue.replace(replaceValue, replaceWith);
  }
  return newValue;
};

export const getOptionValue = (options: IItem[], value: number | string) => {
  return find(options, (v: IItem) => v.value.toString() === value.toString());
};

export const getIndexValue = (options: IItem[], value: number | string) => {
  return findIndex(options, (v: IItem) => v.value.toString() === value.toString());
};
