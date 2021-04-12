import React from 'react';
import { times } from 'lodash';

import { FakeContentForm, FakeListContainer } from './styles';

interface IProps {
  hideShadow?: boolean;
  numberItems?: number;
}

export const VSkeletonForm = (props: IProps) => {
  return (
    <FakeListContainer
      className={props.hideShadow ? '' : 'bp3-skeleton-container'}
    >
      {times(props.numberItems ? props.numberItems : 24).map(
        (value: any, index: number) => (
          <FakeContentForm className={'bp3-skeleton'} key={index} />
        )
      )}
    </FakeListContainer>
  );
};
