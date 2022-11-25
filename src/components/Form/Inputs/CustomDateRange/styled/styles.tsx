import styled from 'styled-components';
import { VInputField } from '../../InputField';
import { DateRangePicker } from '@blueprintjs/datetime';
import { PropsWithChildren } from 'react';
import { BLUEPRINTJS_CLASS_PREFIX } from '../../../../commons/constants';

export const DateRangeInputSectionStyled = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

interface IDateRangeDateTimeSectionBody {
  dateType: 'DATE' | 'DATETIME' | 'TIME';
}

export const DateRangeDateTimeSectionBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: ${(props: IDateRangeDateTimeSectionBody) =>
    props.dateType === 'DATETIME' ? '300px' : 'auto'};
`;

export const DateRangeTimeSectionBody = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const DateRangeTimeSectionWrapper = styled.div`
  padding: 10px;
`;

export const DateRangeTimeSectionDateTimeBody = styled.div`
  width: 440px;
  position: absolute;
  top: 250px;
  right: 5px;
`;

export const VInputFieldStyled = styled<PropsWithChildren<any>>(VInputField)`
  &
    > div.${BLUEPRINTJS_CLASS_PREFIX}-form-content
    > div.gsi-form-field-container
    > div.gsi-input-and-error-container {
    max-width: none;
  }
`;

interface IDateRangePickerStyled {
  disabled?: boolean;
}
export const DateRangePickerStyled = styled<PropsWithChildren<any>>(
  DateRangePicker
)`
  pointer-events: ${(props: IDateRangePickerStyled) =>
    props.disabled && 'none'};
`;
