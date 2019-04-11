import { FormState } from 'formstate';
import { cloneDeep } from 'lodash';

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
    returnedValue[key] = form.$[key].value;
  });
  return returnedValue;
};
