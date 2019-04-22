import validator from 'validator';

export const required = (val: any) =>
  (!val || typeof val !== 'number' && !val.toString().length) && 'This field is required';

export const email = (value: string) =>
  !validator.isEmail(value) && `${value} is not a valid email.`;

export const lt = (maxLength: any) => (value: any) =>
  value.toString().trim().length > maxLength &&
  `The value exceeded ${maxLength} symbols.`;

export const exact = (length: any) => (value: any) =>
  value.toString().trim().length !== length &&
  `The value must be ${length} symbols.`;
