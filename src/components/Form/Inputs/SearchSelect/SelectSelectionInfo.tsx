import React from 'react';
import { Icon } from '@blueprintjs/core';
import styled from 'styled-components';

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
            icon={'caret-down'}
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
          icon={'caret-down'}
        />
      </FlexDiv>
    ) : (
      <FlexDiv disabled={props.disabled}>
        <CarretIcon
          disabled={props.disabled}
          className={'bp3-tag  bp3-minimal gsi-selection-caret'}
          icon={'caret-down'}
        />
      </FlexDiv>
    );
  };

  return getSelectionLabels();
};

interface IFlexDiv {
  disabled: boolean;
}
const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: ${(props: IFlexDiv) => props.disabled && 'not-allowed'};
  .gsi-selection-info {
    margin: 5px 0;
    padding: 2px 4px;
    font-size: 10px;
  }
  .gsi-selection-info-no-selection {
    padding-right: 15px;
  }
  .gsi-selection-info-deselect {
    padding: 0 3px;
    font-weight: bold;
    cursor: ${(props: IFlexDiv) =>
      props.disabled ? 'not-allowed' : 'pointer'};
    margin: 0;
  }
`;

const CarretIcon = styled(Icon)`
  background: transparent !important;
  cursor: ${(props: IFlexDiv) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 5px 0 !important;
  padding: 0 2px;
  svg {
    fill: #5c7080;
  }
`;
