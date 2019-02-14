import React from 'react';
import styled from 'styled-components';
import { List, SemanticCOLORS } from 'semantic-ui-react';

interface ISelectionProps{
    textColor:SemanticCOLORS,
    background:SemanticCOLORS,
    active:boolean
}

export const ListItem = styled(({ active, textColor, background, ...rest }) => <List.Item {...rest} />)`
  background-color: ${(props: ISelectionProps) => (props.background && props.active) ? `${props.background} !Important` : ''};
  color:${(props: ISelectionProps) => (props.textColor && props.active) ? `${props.textColor} !Important` : ''};
`;