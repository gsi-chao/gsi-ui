import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';
import { labelIcon } from '../../TabsMenu/style';
import { LabelIcon } from '../style';
import { IIconTabsPanelProps } from '../types';
import { VBadge } from '../../Badge';

interface IVTabPanelProps {
  label?: string;
  id: string;
  icon?: IIconTabsPanelProps;
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
        backgroundColor = {backgroundColor}
        activeTextColor={activeTextColor}
        textColor={textColor}
        active={active}
        onClick={this.handleOnClick}
        activeBorderColor={activeBorderColor}
        size={size}
      >
        {icon && (
          <Icon
            style={labelIcon}
            icon={icon.icon}
            iconSize={icon.iconSize && icon.iconSize}
            intent={icon.intent && icon.intent}
          />
        )}
        <span>{label}</span>
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
