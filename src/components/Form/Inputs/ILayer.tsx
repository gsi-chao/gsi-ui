export type ILayerWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type LayerOrientation = 'start' | 'center' | 'end';

export interface ILayer {
  labelWidth?: ILayerWidth;
  inputWidth?: ILayerWidth;
  containerWidth?: ILayerWidth;
  labelOrientation?: LayerOrientation;
  inputOrientation?: LayerOrientation;
}
