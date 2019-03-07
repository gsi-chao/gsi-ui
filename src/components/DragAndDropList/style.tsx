import styled from 'styled-components';

interface IDNDContainer {
  orientation?: 'horizontal' | 'vertical';
}
export const DNDContainer = styled.div`
  display: flex;
  align-items: normal;
  justify-content: flex-start;
  flex-direction: ${(props: IDNDContainer) =>
    props.orientation === 'horizontal' ? 'row' : 'column '};

  & > div {
    margin: 10px;
  }
`;

export const DNDItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 2px;
  padding: 5px 7px;
  text-decoration: none;
  line-height: 20px;
  color: inherit;
  user-select: none;
  & > div {
    width: 100%;
  }
  &:hover {
    background-color: rgba(167, 182, 194, 0.3);
    cursor: pointer;
    text-decoration: none;
  }
`;

export const DNDList = styled.div`
  height: 100%;
`;
