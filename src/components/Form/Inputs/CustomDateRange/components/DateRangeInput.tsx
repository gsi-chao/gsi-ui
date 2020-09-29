import React, { FC } from 'react';
import { IDateRangeInput } from '../type/IDateRangeInput';
import { VInputFieldStyled } from '../styled/styles';

export const DateRangeInput: FC<IDateRangeInput> = ({
  valueField,
  ...props
}) => {
  return (
    <VInputFieldStyled
      value={valueField}
      readOnly
      inline={true}
      noLabel
      margin={'0'}
      {...props}
    />
  );
};
