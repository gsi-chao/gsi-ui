import styled from 'styled-components';

interface ICarouselContainer {
  sliding:  boolean,
  direction:  string,
}

export const SliderWrapper = styled.div`    
      width: 100%;
      padding: 40px 0 0;
      overflow: hidden;
      position: relative;
      .slider {
        display: flex;
        position: relative;
    
        &__container {
          display: flex;
          padding: 0;
          transition: transform 300ms ease 100ms;
          width: 100%;
        }
        
        &:not(&--open):hover .item {
          transform: translateX(-25%);
        }
      
        &:not(&--open) .item:hover ~ .item {
          transform: translateX(25%);
        }  
      }  
      .item {
        //flex: 0 0 19.7%;
        transition: transform 300ms ease 100ms;
        margin: 0 2px;
        position: relative;
      }
`;

export const SliderButtonSC = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25px;
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  outline: 0;
  padding: 0;
  margin: 40px 0 0;
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
