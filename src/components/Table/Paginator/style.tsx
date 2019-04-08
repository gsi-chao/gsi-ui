import styled from 'styled-components';

interface IProps {
  backgroundHover?: string;
  backgroundColor?:string
}

export const Pages = styled.ul`
  list-style: none;
  padding: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  color: black;
  margin: 0px;
  ;
`;

export const Page = styled.li`
  padding: 10px;
  cursor: pointer;
  background-color: ${(props:IProps)=>props.backgroundColor};
  :hover {
    background-color: ${(props: IProps) =>
      props.backgroundHover };
  }
`;
