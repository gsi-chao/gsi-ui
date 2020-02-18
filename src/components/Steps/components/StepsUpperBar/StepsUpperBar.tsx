import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStepsContext } from '../../VSteps';

const SRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

interface ISLine {
  isDone?: boolean;
  mainColor?: string;
  secondaryColor?: string;
}

const SLine = styled('hr')`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid
    ${(props: ISLine) =>
      props.isDone
        ? props.mainColor ?? '#137cbd'
        : props.secondaryColor ?? '#c7cbd3'};
  margin: 1em 0;
  padding: 0;
  width: 100%;
  margin: 10px;
`;

const StepsUpperBar = (props: React.PropsWithChildren<{}>) => {
  const mainCtx = useContext(MainStepsContext);

  const count = React.Children.count(props.children);
  const children: any = [];

  React.Children.forEach(props.children, (child: any, index) => {
    // Add line if is not the last one
    children.push(child);
    if (index < count - 1) {
      children.push(
        <SLine
          isDone={child.props.currentStep > index}
          mainColor={mainCtx.mainColor}
          secondaryColor={mainCtx.secondaryColor}
        />
      );
    }
  });

  return <SRow>{children}</SRow>;
};

export default StepsUpperBar;
