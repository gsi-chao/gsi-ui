import { Icon } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { IPagination } from './types';
import { PaginationStyled } from './styles';
import Select from 'rc-select';

const GSIPagination = (props: IPagination) => {
  const [local, setLocal] = useState({});

  useEffect(() => {
    (async () =>
      setLocal(
        await import(`rc-pagination/lib/locale/${props.local || 'en_US'}`)
      ))();
  }, []);

  return (
    <PaginationStyled
      selectComponentClass={Select as any}
      locale={local}
      {...props}
      nextIcon={
        props.nextIcon || (
          <Icon
            icon={'chevron-right'}
            className={'gsi-pagination-navigation-icon'}
          />
        )
      }
      prevIcon={
        props.prevIcon || (
          <Icon
            icon={'chevron-left'}
            className={'gsi-pagination-navigation-icon'}
          />
        )
      }
      jumpNextIcon={
        props.jumpNextIcon || (
          <Icon
            icon={'double-chevron-right'}
            className={'gsi-pagination-navigation-jump-icon'}
          />
        )
      }
      jumpPrevIcon={
        props.jumpPrevIcon || (
          <Icon
            icon={'double-chevron-left'}
            className={'gsi-pagination-navigation-jump-icon'}
          />
        )
      }
    />
  );
};

export default GSIPagination;
