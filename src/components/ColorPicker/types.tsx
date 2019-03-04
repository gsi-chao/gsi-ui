import { HSLColor, RGBColor } from 'react-color';

export type TypePickerColor = 'SketchPicker' | 'ChromePicker';
export type TypeFormatColor = 'RGB' | 'HEX';
export type VPosition = 'left' | 'right' | 'bottom' | 'top';

export interface VColorResult {
  hex: string;
  hsl: HSLColor;
  rgb: RGBColor;
}
