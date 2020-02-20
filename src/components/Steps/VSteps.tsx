import React, { useState } from 'react';

import StepsUpperBar from './components/StepsUpperBar/StepsUpperBar';
import StepsUpperBarNode from './components/StepsUpperBar/StepsUpperBarNode';
import { IVSteps } from './types';

export const MainStepsContext = React.createContext<IVSteps>({});

export const VSteps = (props: React.PropsWithChildren<IVSteps>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = React.Children.count(props.children);

  const findStepKey = () => {
    let r;
    React.Children.forEach(props.children, (child: any, index) => {
      if (index === currentStep) {
        r = child.props.stepKey;
        return;
      }
    });
    return r;
  };

  const goToPreviousStep = () => {
    currentStep > 0 && setCurrentStep(currentStep - 1);

    props.onChange && props.onChange(findStepKey(), 'previous');
  };

  const goToNextStep = () => {
    currentStep < totalSteps - 1 && setCurrentStep(currentStep + 1);

    props.onChange && props.onChange(findStepKey(), 'next');
  };

  const upperBarNodes: JSX.Element[] = [];

  const children = React.Children.map(props.children, (child: any, index) => {
    upperBarNodes.push(
      <StepsUpperBarNode
        key={`StepNode${index}`}
        index={index + 1}
        title={child.props.title}
        icon={child.props.icon}
        description={child.props.description}
        currentStep={currentStep}
        isActive={index === currentStep}
        isDone={index < currentStep}
      />
    );
    return React.cloneElement(child, {
      isActive: index === currentStep,
      displayPrevious: currentStep > 0,
      displayNext: currentStep < totalSteps - 1,
      displaySubmit: currentStep === totalSteps - 1,
      goToPreviousStep: () => goToPreviousStep(),
      goToNextStep: () => goToNextStep()
    });
  });

  return (
    <MainStepsContext.Provider value={{ ...props }}>
      {children ? (
        <>
          <StepsUpperBar>{upperBarNodes}</StepsUpperBar>
          <>{children}</>
        </>
      ) : (
        <>{'There are no steps'}</>
      )}
    </MainStepsContext.Provider>
  );
};
