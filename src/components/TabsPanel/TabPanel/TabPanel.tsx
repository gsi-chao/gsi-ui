import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';
import { labelIcon } from '../../TabsMenu/style';
import { LabelIcon } from '../style';
import { IIconTabsPanelProps } from '../types';
import { VBadge } from '../../Badge';
import styled from 'styled-components';

interface IVTabPanelProps {
  label?: string;
  id: string;
  icon?: IIconTabsPanelProps | React.ReactNode;
  active: boolean;
  borderColor?: string;
  activeColor?: string;
  activeTextColor?: string;
  textColor?: string;
  backgroundColor?: string;
  handleOnClick: (tabKey: string) => void;
  textColorBadge?: string;
  backgroundColorBadge?: string;
  dataBadge?: any;
  size?: 'small' | 'normal';
  activeBorderColor?: string;
  padding?: string;
}

export class VTabPanel extends Component<IVTabPanelProps> {
  render() {
    const {
      size,
      label,
      icon,
      active,
      borderColor,
      activeColor,
      activeTextColor,
      textColor,
      backgroundColorBadge,
      dataBadge,
      textColorBadge,
      activeBorderColor,
      backgroundColor
    } = this.props;
    return (
      <LabelIcon
        borderColor={borderColor}
        activeColor={activeColor}
        backgroundColor={backgroundColor}
        activeTextColor={activeTextColor}
        textColor={textColor}
        active={active}
        onClick={this.handleOnClick}
        activeBorderColor={activeBorderColor}
        size={size}
        padding={this.props.padding}
      >
        {icon && typeof icon === 'object' && (
          <Icon style={labelIcon} {...icon as IIconTabsPanelProps} />
        )}
        {icon && React.isValidElement(icon) && <>{icon}</>}

        <StyledSpan>{label}</StyledSpan>
        {dataBadge && (
          <VBadge
            backgroundColorBadge={backgroundColorBadge}
            textColorBadge={textColorBadge}
            dataBadge={dataBadge}
          />
        )}
      </LabelIcon>
    );
  }

  handleOnClick = (e: any) => {
    this.props.handleOnClick(this.props.id);
  };
}

const StyledSpan = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 90%;
`;
