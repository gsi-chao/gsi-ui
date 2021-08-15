import React, { FC, useMemo } from 'react';
import { IDateRangeInput } from '../type/IDateRangeInput';
import { VMaskField } from '../../MaskField';

export const DateRangeInput: FC<IDateRangeInput> = ({
  valueField,
  format,
  ...props
}) => {
  const mask = useMemo(() => getMask(format), [format]);

  return (
    <VMaskField
      value={valueField}
      inline={true}
      noLabel
      margin={'0'}
      guide={false}
      placeholder={format}
      mask={mask}
      {...props}
    />
  );
};

const getMask = (format: string) => {
  const charArray = `${format}`.split('');
  return charArray
    ?.map(char => {
      switch (char.toLowerCase()) {
        case 'd':
        case 'm':
        case 'y':
        case 'k':
        case 'h': {
          return /[0-9]/;
        }
        case 'a': {
          return [/[a,p]/, /m/];
        }
        default: {
          return char;
        }
      }
    })
    .flat();
};
