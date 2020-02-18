import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainStepsContext } from '../VSteps';

interface ISDiv {
  mainColor?: string;
}

const SDiv = styled('div')`
  color: ${(props: ISDiv) => props.mainColor ?? '#137cbd'};
  font-family: arial;
  -ms-transform: scaleX(-1) rotate(-45deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-45deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-45deg);
`;

const CheckMark = () => {
  const mainCtx = useContext(MainStepsContext);

  return <SDiv mainColor={mainCtx.mainColor}>{'L'}</SDiv>;
};

export default CheckMark;
