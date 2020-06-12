import { FunctionComponent } from 'react';

export interface IVSteps {
  mainColor?: string;
  secondaryColor?: string;
  textMainColor?: string;
  textSecondaryColor?: string;
  onChange?: (
    currentStep?: string | number | undefined,
    buttonClick?: 'next' | 'previous'
  ) => void;
}

export interface IVStep {
  stepKey?: string | number;
  title?: string;
  icon?: JSX.Element;
  description?: string;
  component?: FunctionComponent<{}>;
}
