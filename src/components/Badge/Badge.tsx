import React, { Component } from 'react';
import { IVBadgeProps } from './types';
import { BadgeStyle } from './style';

export class VBadge extends Component<IVBadgeProps> {
  constructor(props: IVBadgeProps) {
    super(props);
  }

  render() {
    const {
      className,
      textColorBadge,
      dataBadge,
      backgroundColorBadge
    } = this.props;
    return (
      <BadgeStyle
        className={className}
        textColorBadge={textColorBadge!}
        backgroundColorBadge={backgroundColorBadge!}
        data-badge={dataBadge}
      />
    );
  }
}
