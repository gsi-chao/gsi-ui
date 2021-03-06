import React from 'react';

import { CarretIcon, FlexDiv } from './styled';

interface IProps {
  count: number;
  deselectAllItems: () => void;
  multi: boolean;
  disabled: boolean;
}

export const SelectSelectionInfo = (props: IProps) => {
  const getSelectionLabels = () => {
    if (props.count > 0) {
      return (
        <FlexDiv disabled={props.disabled}>
          <span className={'bp3-tag  bp3-minimal gsi-selection-info'}>
            {`${props.count} Selected`}{' '}
            <span
              className={'gsi-selection-info gsi-selection-info-deselect'}
              children={'X'}
              onClick={() => !props.disabled && props.deselectAllItems()}
            />
          </span>
          <CarretIcon
            disabled={props.disabled}
            className={'bp3-tag  bp3-minimal gsi-selection-caret'}
            icon={'chevron-down'}
          />
        </FlexDiv>
      );
    }
    return props.multi ? (
      <FlexDiv disabled={props.disabled}>
        <span
          className={
            'bp3-tag  bp3-minimal gsi-selection-info gsi-selection-info-no-selection'
          }
        >
          No Selection
        </span>
        <CarretIcon
          disabled={props.disabled}
          className={'bp3-tag  bp3-minimal gsi-selection-caret'}
          icon={'chevron-down'}
        />
      </FlexDiv>
    ) : (
      <FlexDiv disabled={props.disabled}>
        <CarretIcon
          disabled={props.disabled}
          className={'bp3-tag  bp3-minimal gsi-selection-caret'}
          icon={'chevron-down'}
        />
      </FlexDiv>
    );
  };

  return getSelectionLabels();
};
