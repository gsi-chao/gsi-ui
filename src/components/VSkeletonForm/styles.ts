import styled from 'styled-components';


export const ListFormCol = styled.div`
  width: 100%;
  height: 100%;
  .bp3-skeleton-container {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2);
  }
`;

export const FakeContentForm = styled.div`
  height: 20px;
  margin: 5px 5px 10px 5px;
  flex: 1 1 45%;
`;

export const FakeListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
  background-color: #fff;
  width: 100%;
  height: 100%;
`;
