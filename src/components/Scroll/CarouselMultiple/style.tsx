import styled from 'styled-components';

interface IPaddingProps {
  padding: string;
}

export const SliderWrapper = styled.div`
  width: 100%;
  padding: ${(props: IPaddingProps) => props.padding || `10px 0 0`};
  overflow: hidden;
  position: relative;
  .slider {
    display: flex;
    position: relative;
    border-bottom: 2px solid rgba(142, 142, 142, 0.36);

    &__container {
      display: flex;
      padding: 0;
      transition: transform 300ms ease 100ms;
      width: 100%;
    }

    &:not(&--open):hover .item {
      transform: translateX(-2%);
    }

    &:not(&--open) .item:hover ~ .item {
      transform: translateX(3%);
    }
  }
  .item {
    transition: transform 300ms ease 100ms;
    margin: 0;
    position: relative;
    & > div {
      border-bottom: none;
    }
  }
`;

export const SliderButtonSC = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25px;
  background: rgba(0, 0, 0, 0.3);
  border: 0;
  outline: 0;
  padding: 0;
  margin: 5px 0;
  z-index: 1;

  span {
    width: 25px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }

  &.slide-button--next {
    right: 0;
  }

  &.slide-button--prev {
    left: 0;
  }
`;
