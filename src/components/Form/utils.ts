import { FormState } from 'formstate';

export const patchFormValues = (form: FormState<any>, object: any) => {
  Object.keys(object).map((key: string) => {
    if (form.$[key]) {
      form.$[key].value = object[key];
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
