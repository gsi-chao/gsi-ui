import styled from 'styled-components';

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
    props.dateType === 'DATETIME' ? '332px' : 'auto'};
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
  top: 280px;
  right: 5px;
`;
