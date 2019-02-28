import { HSLColor, RGBColor } from 'react-color';

export type TypePickerColor = 'SketchPicker' | 'ChromePicker';
export type TypeFormatColor = 'RGB' | 'HEX';


export interface VColorResult {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
}