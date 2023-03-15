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
  id,
  multi,
  allowEmpty,
  popoverWidth,
  placeholderSearch,
  suppessLeftIconSearch
}) => {
  const { refInputSearch } = useContext(VSearchSelectFieldAsyncContext);

  return (
    <div style={{ width: `${popoverWidth ? `${popoverWidth}px` : '100%'}` }}>
      <VSearchSelectAsyncInput
        {...{ id }}
        ref={refInputSearch}
        fill={!!popoverWidth}
        placeholder={placeholderSearch}
        suppessLeftIcon={suppessLeftIconSearch}
      />
      <VSearchSelectAsyncSection {...{ id, multi, allowEmpty }} />
    </div>
  );
};
