import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStepsContext } from '../../VSteps';
import CheckMark from '../CheckMark';

interface IStyleProps {
  isActive?: boolean;
  isDone?: boolean;
  mainColor?: string;
  secondaryColor?: string;
}

const SRow = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props: IStyleProps) =>
    props.isActive ? '#252628' : props.secondaryColor ?? '#7b7d82'};
`;

const DescriptionDiv = styled('div')`
  width: max-content;
  font-size: smaller;
`;

const CircleDiv = styled('div')`
  height: 30px;
  width: 30px;
  line-height: 30px;
  background-color: ${(props: IStyleProps) =>
    props.isActive ? props.mainColor ?? '#137cbd' : ''};
  border-radius: 50%;
  border: solid 1px;
  border-color: ${(props: IStyleProps) =>
    props.isDone
      ? props.mainColor ?? '#137cbd'
      : props.secondaryColor ?? '#7b7d82'};
  color: ${(props: IStyleProps) =>
    props.isActive ? '#e9ecf3' : props.secondaryColor ?? '#7b7d82'};
  text-align: center;
  margin-right: 5px;
`;

export interface IStepsUpperBarNode {
  title: string;
  description: string;
  icon?: JSX.Element;
  index: number;
  currentStep: number;
  isActive?: boolean;
  isDone?: boolean;
}

const StepsUpperBarNode = (props: IStepsUpperBarNode) => {
  const mainCtx = useContext(MainStepsContext);

  return (
    <>
      <SRow {...props}>
        {props.icon ? (
          props.icon
        ) : (
          <CircleDiv
            {...props}
            mainColor={mainCtx.mainColor}
            secondaryColor={mainCtx.secondaryColor}
          >
            {props.isDone ? <CheckMark /> : props.index}
          </CircleDiv>
        )}
        <div>
          <div>{props.title}</div>
          <DescriptionDiv>{props.description}</DescriptionDiv>
        </div>
      </SRow>
    </>
  );
};

export default StepsUpperBarNode;
