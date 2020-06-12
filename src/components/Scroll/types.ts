export interface StyledCardProps {
  height?: string;
  width?: string;
  elements: any[];
  buttonsJustify?: FlexJustifyVCarrousel;
}

export type FlexJustifyVCarrousel = 'center' | 'flex-end' | 'flex-start';

export interface PanelState {
  activeIndex: number;
  fromLeft: boolean;
  fromRight: boolean;
  activeElement: any;
}
