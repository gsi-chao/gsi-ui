import React from 'react';
import styled from 'styled-components';
import { Accordion } from 'semantic-ui-react';

interface ItitleProps {
  border: string;
  background: string;
}

export const TitleM = styled(({ border, background, ...rest }) => (
  <Accordion.Title {...rest} />
))`
  border: ${(props: ItitleProps) =>
    props.border
      ? `1px solid ${props.border} !Important;
   border-radius: 5px !Important`
      : ''};
  background-color: ${(props: ItitleProps) =>
    props.background ? `${props.background} !Important` : ''};
  padding-top: 4px !Important;
  padding-bottom: 4px !Important;
`;
export const titleIcon = {
  float: 'left'
};
export const accordionStyle = {
  width: '100%',
  marginBottom: '25px'
};

export const titleStyle = {
  border: '1px solid #006ce5',
  borderRadius: '5px',
  backgroundColor: '#d4e3fc',
  paddingTop: '4px',
  paddingBottom: '4px'
};
