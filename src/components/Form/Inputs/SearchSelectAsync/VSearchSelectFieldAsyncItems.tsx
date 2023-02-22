import React, { FC, useContext } from 'react';
import { VSearchSelectFieldAsyncContext } from './context/VSearchSelectFieldAsyncContext';
import { VSearchSelectAsyncInput } from './VSearchSelectAsyncInput';
import {
  VSearchSelectAsyncSection,
  VSearchSelectAsyncSectionProps
} from './VSearchSelectAsyncSection';

type VSearchSelectFieldAsyncItemsProps = VSearchSelectAsyncSectionProps & {
  popoverWidth?: number;
};

export const VSearchSelectFieldAsyncItems: FC<VSearchSelectFieldAsyncItemsProps> = ({
  multi,
  allowEmpty,
  popoverWidth
}) => {
  const { refInputSearch } = useContext(VSearchSelectFieldAsyncContext);

  return (
    <div style={{ width: `${popoverWidth ? `${popoverWidth}px` : '100%'}` }}>
      <VSearchSelectAsyncInput ref={refInputSearch} fill={!!popoverWidth} />
      <VSearchSelectAsyncSection {...{ multi, allowEmpty }} />
    </div>
  );
};
