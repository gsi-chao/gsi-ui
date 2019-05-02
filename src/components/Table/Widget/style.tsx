import styled from 'styled-components';
 interface IProps {
   backgroundColor?:string;
   color?:string;
 }

export const CenterWidget = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${(props:IProps)=>props.backgroundColor?props.backgroundColor:'transparent'};
  color: ${(props:IProps)=>props.color?props.color:'black'};
`;
