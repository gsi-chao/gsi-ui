import React, { FC } from 'react';
import { IDateRangeInput } from '../type/IDateRangeInput';
import { VInputField } from '../../InputField';

export const DateRangeInput: FC<IDateRangeInput> = ({
  valueField,
  ...props
}) => {
  return (
    <VInputField
      value={valueField}
      readOnly
      inline={true}
      noLabel
      margin={'0'}
      {...props}
    />
  );
};
