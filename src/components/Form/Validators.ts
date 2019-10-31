import validator from 'validator';

const required = (val: any) =>
  (!val || (typeof val !== 'number' && !val.toString().length)) &&
  'This field is required.';

const email = (value: string) =>
  !validator.isEmail(value) && `${value} is not a valid email.`;

const lt = (maxLength: number) => (value: string) =>
  value.toString().trim().length > maxLength &&
  `The value must me have less than ${maxLength} symbols.`;

const gt = (minLength: number) => (value: string) =>
  value.toString().trim().length < minLength &&
  `The value must me have great than ${minLength} symbols.`;

const exact = (length: number) => (value: string) =>
  value.toString().trim().length !== length &&
  `The value must be ${length} symbols.`;

const ltNumber = (min: number) => (value: string) =>
  (!validator.isNumeric(min.toString()) ||
    !validator.isNumeric(value) ||
    Number(value) > min) &&
  `The value must be less than ${min}.`;

const gtNumber = (max: number) => (value: string) =>
  (!validator.isNumeric(max.toString()) ||
    !validator.isNumeric(value) ||
    Number(value) < max) &&
  `The value must be great than ${max}.`;

const isLatLong = () => (value: string) =>
  !validator.isLatLong(value.toString()) &&
  `The value ${value} is not a valid Longitude / Latitude.`;

const isCreditCard = () => (value: string) =>
  !validator.isCreditCard(value) &&
  `The value ${value} is not a valid Credit Card.`;

const isMACAddress = () => (value: string) =>
  !validator.isMACAddress(value) &&
  `The value ${value} is not a valid MAC Address.`;

const isURL = () => (value: string) =>
  !validator.isURL(value) && `The value ${value} is not a valid URL`;

const isPhone = () => (value: string) =>
  !validator.isMobilePhone(value, 'en-US') &&
  `The value ${value} is not a valid Phone`;

const isPostalCode = () => (value: string) =>
  !validator.isPostalCode(value, 'US') &&
  `The value ${value} is not a valid Postal Code`;

const isLatitude = (value: any) => {
  return (
    value &&
    !(
      Number.isFinite(Number(value)) &&
      Number(value) >= -90 &&
      Number(value) <= 90
    ) &&
    `The value isn't a valid Latitude.`
  );
};

export const requiredIf = (func: () => boolean) => (value: any) => {
  return func() && Validators.required(value);
};

const isLongitude = (value: any) => {
  return (
    value &&
    !(
      Number.isFinite(Number(value)) &&
      Number(value) >= -180 &&
      Number(value) <= 180
    ) &&
    `The value isn't a valid Longitude.`
  );
};

export const Validators = {
  exact,
  lt,
  email,
  required,
  gt,
  ltNumber,
  gtNumber,
  isLatLong,
  isCreditCard,
  isMACAddress,
  isURL,
  isPhone,
  isPostalCode,
  isLatitude,
  isLongitude,
  requiredIf
};
