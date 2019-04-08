import styled from 'styled-components';

interface IProps {
  backgroundHover?: string;
  backgroundColor?: string
  color?: string;
  colorHover?: string;
  border?: string
  isLast?: boolean;
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

const getBorder = (props: IProps) => {

  if (props.isLast) {
    return props.border ? props.border : '0px 8px 8px 0px;';
  }
  return '0px';
};

export const Page = styled.li`
  padding: 10px;
  cursor: pointer !important;
  background-color: ${(props: IProps) => props.backgroundColor};
  color:${(props: IProps) => props.color};
  border-radius:  ${(props: IProps) => getBorder(props)};
  
  :hover {
    background-color: ${(props: IProps) =>
  props.backgroundHover };
    color:${(props: IProps) => props.colorHover};
  }
`;

