import React from 'react';
import { times } from 'lodash';

import { FakeContentForm, FakeListContainer } from './styles';
import { BLUEPRINTJS_CLASS_PREFIX } from '../commons/constants';

interface IProps {
  hideShadow?: boolean;
  numberItems?: number;
}

export const VSkeletonForm = (props: IProps) => {
  return (
    <FakeListContainer
      className={
        props.hideShadow ? '' : `${BLUEPRINTJS_CLASS_PREFIX}-skeleton-container`
      }
    >
      {times(props.numberItems ? props.numberItems : 24).map(
        (value: any, index: number) => (
          <FakeContentForm
            className={`${BLUEPRINTJS_CLASS_PREFIX}-skeleton`}
            key={index}
          />
        )
      )}
    </FakeListContainer>
  );
};
