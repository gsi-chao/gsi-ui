import React, { FC, useContext } from 'react';
import { EmptyData } from '../../../SelectionList/EmptyData';
import { SearchSelectItems } from '../SearchSelect/SearchSelectItems';
import { VSearchSelectFieldAsyncContext } from './context/VSearchSelectFieldAsyncContext';
import { VSearchSelectSectionBody } from './styled';
import { VSearchSelectFieldAsyncProps } from './VSearchSelectFieldAsync';

export type VSearchSelectAsyncSectionProps = Pick<
  VSearchSelectFieldAsyncProps,
  'multi' | 'allowEmpty' | 'placeholderSearch' | 'suppessLeftIconSearch' | 'id'
>;

export const VSearchSelectAsyncSection: FC<VSearchSelectAsyncSectionProps> = ({
  id,
  multi,
  allowEmpty
}) => {
  const { options, selection, selectDeselectItem } = useContext(
    VSearchSelectFieldAsyncContext
  );

  if (!options.length) {
    return (
      <VSearchSelectSectionBody>
        <EmptyData settings={{}} />
      </VSearchSelectSectionBody>
    );
  }

  return (
    <VSearchSelectSectionBody>
      <SearchSelectItems
        key={`search-select-async-section-${id}`}
        {...{ options, selection, multi, selectDeselectItem, allowEmpty }}
        allowNewItem={false}
      />
    </VSearchSelectSectionBody>
  );
};
