// todo remove deprecate component.

import React from 'react';
import { StyledDNDList } from './style';
import { observer } from 'mobx-react';

/**
 * Moves an item from one list to another list.
 */

export interface IDNDListProps {
  provided: any;
  innerRef: any;
  value: any;
  children: any;
}

export const DNDList = observer((props: IDNDListProps) => {
  const { innerRef, provided, value, children } = props;
  return (
    <StyledDNDList
      ref={innerRef}
      {...provided.droppableProps}
      style={{
        height: `calc(100%${(value.allowFilter && ' - 35px') || ''})`
      }}
    >
      {children}
    </StyledDNDList>
  );
});
