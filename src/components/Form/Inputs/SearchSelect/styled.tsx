import styled from 'styled-components';
import { Checkbox, InputGroup } from '@blueprintjs/core';

export const SelectItemCheckbox = styled(Checkbox)`
  margin-bottom: 0;
`;

interface ISelectInput {
  hasTags: boolean;
}
export const SelectInputGroup = styled(InputGroup)`
  & > input {
    padding-right: ${(props: ISelectInput) => props.hasTags && `${100}px !important`};
  }
`;
