import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { IVStep } from './types';
import ButtonsBar from './components/Buttons/ButtonsBar';

const ChildrenDiv = styled('div')`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

interface IVStepContext {
  stepKey?: string | number;
  isActive?: boolean;
  isDone?: boolean;
  title?: string;
  icon?: JSX.Element;
  description?: string;
  component?: FunctionComponent<{}>;
  displayPrevious?: boolean;
  displayNext?: boolean;
  displaySubmit?: boolean;
  goToNextStep?: () => void;
  goToPreviousStep?: () => void;
}

export const StepContext = React.createContext<IVStepContext>({});

export const VStep = (props: React.PropsWithChildren<IVStep>) => {
  const pp: any = props;

  return (
    <>
      {pp.isActive && (
        <>
          <ChildrenDiv>
            {props.component
              ? React.createElement(props.component)
              : props.children}
          </ChildrenDiv>
          <StepContext.Provider value={{ ...props }}>
            <ButtonsBar />
          </StepContext.Provider>
        </>
      )}
    </>
  );
};