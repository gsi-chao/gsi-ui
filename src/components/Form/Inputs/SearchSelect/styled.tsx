import styled from 'styled-components';
import { Checkbox, Icon, InputGroup } from '@blueprintjs/core';

export const SelectItemCheckbox = styled(Checkbox)`
  margin-bottom: 0;
`;


interface IFlexDiv {
  disabled: boolean;
}
export const FlexDiv = styled.div`
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

export const CarretIcon = styled(Icon)`
  background: transparent !important;
  cursor: ${(props: IFlexDiv) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 5px 0 !important;
  padding: 0 2px;
  svg {
    fill: #5c7080;
  }
`;
