import validator from 'validator';

const required = (val: any) =>
  (!val || (typeof val !== 'number' && !val.toString().length)) &&
  'This field is required';

const email = (value: string) =>
  !validator.isEmail(value) && `${value} is not a valid email.`;

const lt = (maxLength: any) => (value: any) =>
  value.toString().trim().length > maxLength &&
  `The value exceeded ${maxLength} symbols.`;

const exact = (length: any) => (value: any) =>
  value.toString().trim().length !== length &&
  `The value must be ${length} symbols.`;

export const Validators = { exact, lt, email, required };
