import React, { FC, useContext } from 'react';
import { VSearchSelectFieldAsyncContext } from './context/VSearchSelectFieldAsyncContext';
import { VSearchSelectAsyncInput } from './VSearchSelectAsyncInput';
import {
  VSearchSelectAsyncSection,
  VSearchSelectAsyncSectionProps
} from './VSearchSelectAsyncSection';

type VSearchSelectFieldAsyncItemsProps = VSearchSelectAsyncSectionProps & {};

export const VSearchSelectFieldAsyncItems: FC<VSearchSelectFieldAsyncItemsProps> = ({
  multi
}) => {
  const { refInputSearch } = useContext(VSearchSelectFieldAsyncContext);

  return (
    <>
      <VSearchSelectAsyncInput ref={refInputSearch} />
      <VSearchSelectAsyncSection {...{ multi }} />
    </>
  );
};
