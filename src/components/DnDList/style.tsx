import styled from 'styled-components';

interface IDnDList {
  direction: 'horizontal' | 'vertical';
  background?: string;
  dragColor?: string;
  isDragging: boolean;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
}

export const DnDListContainer = styled.div`
  background: ${(props: IDnDList) =>
    props.isDragging
      ? props.dragColor
        ? props.dragColor
        : 'lightblue'
      : props.background
      ? props.background
      : '#eae8e8'};
  padding: ${(props: IDnDList) => (props.padding ? props.padding : '5px')};
  margin: ${(props: IDnDList) => (props.margin ? props.margin : 0)};
  display: ${(props: IDnDList) =>
    props.direction === 'horizontal' ? 'flex' : 'inherit'};
  overflow: ${(props: IDnDList) =>
    props.direction === 'horizontal' ? 'auto' : 'inherit'};
  width: ${(props: IDnDList) =>
  props.width ? props.width : 'auto'};
  min-width: ${(props: IDnDList) =>
  props.direction === 'horizontal' ? '100%' : '250px'};
   height: ${(props: IDnDList) =>
  props.height ? props.height : 'auto'};
  min-height: ${(props: IDnDList) =>
  props.direction === 'horizontal' ? '100%' : '100px'};
`;

interface IDNDItem {
  draggableStyle: any;
  padding?: string;
  margin?: string;
}

export const DNDItem = styled.div`
  padding: ${(props: IDNDItem) => (props.padding ? props.padding : '5px')};
  margin: ${(props: IDNDItem) => (props.margin ? props.margin : 0)};
  ...draggableStyle;
`;
