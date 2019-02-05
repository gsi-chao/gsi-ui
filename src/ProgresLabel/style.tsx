import styled from 'styled-components';

interface IProgresLabelStyle {
    minWidth?: string;
    Width?: string;
    BackgorundColor?:string;
}

export const ProgressLabelSegment = styled.div`
  min-width: ${(props: IProgresLabelStyle) => props.minWidth || "250px"};
  display: inline-flex;
`;

const x = `border-style: solid;  border-width: 1px;`;

export const ProgressLabelSegmentFirst = styled.div`
  width: ${(props: IProgresLabelStyle) => props.Width || "50%"};
  display: inline-flex;
  background-color: ${(props: IProgresLabelStyle) => props.BackgorundColor || "#92d36e"};
  border-radius: 28px 0 0 28px;
  ${x}
  text-align: center;
`;

export const ProgressLabelSegmentLast = styled.div`
  width: ${(props: IProgresLabelStyle) => props.Width || "50%"};
  display: inline-flex;
  background-color: ${(props: IProgresLabelStyle) => props.BackgorundColor || "#eff6fd"};
  border-radius: 0 28px 28px 0;
  border-style: solid;
  border-width: 1px 1px 1px 0px;
  text-align: center;
`;

export const ProgressLabelSegmentCenter = styled.div`
  width: ${(props: IProgresLabelStyle) => props.Width || "50%"};
  display: inline-flex;
  background-color: ${(props: IProgresLabelStyle) => props.BackgorundColor || "#eff6fd"};
  border-style: solid;
  border-width: 1px 1px 1px 0;
  text-align: center;
`;

export const ProgressLabelSegmentUnic = styled.div`
  width: ${(props: IProgresLabelStyle) => props.Width || "100%"};
  display: inline-flex;
  background-color: ${(props: IProgresLabelStyle) => props.BackgorundColor || "#92d36e"};
  border-radius: 28px;
  border-style: solid;
  border-width: 1px;
  text-align: center;
`;

export const SpanText = styled.span`
    width: 100%
`;

export const dividerProgresVertical = {
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    borderRight: '1px solid #182026'
};