import { Collapse, Elevation, Icon, IconName } from '@blueprintjs/core';
import {
  VCard,
  VCardBody,
  VCardHeader,
  VCardTextSpan,
  VCardTextSpanContainer
} from './style';
import React, { Component } from 'react';
import { FlexJustify, HeaderOrientation } from './types';

interface StyledCardProps {
  noHeader?: boolean;
  headerText?: string;
  children?: any;
  headerIcon?: any;
  headerBackgroundColor?: any;
  backgroundColor?: any;
  headerColor?: any;
  headerHorizontalAlign?: FlexJustify;
  cardElevation?: Elevation;
  height?: string;
  width?: string;
  collapse?: boolean;
  transitionDuration?: number;
  bodyPadding?: string;
  keepChildrenMounted?: boolean;
  openIcon?: IconName;
  closeIcon?: IconName;
  headerOrientation?: HeaderOrientation;
  headerTextJustify?: FlexJustify;
  className?: string;
  defaultActive?: boolean;
  headerCustomComponent?: any;
  heigthHeaderPx?: number;
  headerCustomButton?: any;
}

interface PanelState {
  isOpen: boolean;
}

export class VCardPanel extends Component<StyledCardProps, PanelState> {
  constructor(props: StyledCardProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    this.setState({ isOpen: this.props.defaultActive || false });
  }

  toggleCollapsed = () => {
    const { isOpen } = this.state;
    this.setState({ ...this.state, isOpen: !isOpen });
  };

  render() {
    const {
      headerIcon,
      headerText,
      children,
      headerBackgroundColor,
      headerHorizontalAlign,
      headerColor,
      backgroundColor,
      cardElevation,
      height,
      width,
      collapse,
      transitionDuration,
      bodyPadding,
      keepChildrenMounted,
      closeIcon,
      openIcon,
      headerOrientation,
      headerTextJustify,
      noHeader,
      className,
      headerCustomComponent,
      headerCustomButton
    } = this.props;
    const { isOpen } = this.state;
    return (
      <VCard
        elevation={cardElevation || 0}
        height={height}
        className={className}
        collapse={collapse ? 'true' : 'false'}
        transitionduration={transitionDuration}
        isopen={isOpen ? 'true' : 'false'}
        width={width}
      >
        {!noHeader ? (
          <VCardHeader
            headerBackgroundColor={headerBackgroundColor}
            headerOrientation={headerOrientation}
            headerJustifyContent={headerHorizontalAlign}
            heigthHeaderPx={this.props.heigthHeaderPx}
          >
            <VCardTextSpanContainer>
              <VCardTextSpan
                headerColor={headerColor}
                headerTextJustify={headerTextJustify}
              >
                {headerCustomButton}
                {headerIcon ? <Icon icon={headerIcon} /> : null}
                <span>{headerText}</span>
              </VCardTextSpan>
            </VCardTextSpanContainer>
            {collapse ? (
              <span onClick={this.toggleCollapsed}>
                <Icon
                  icon={
                    isOpen
                      ? closeIcon || 'chevron-up'
                      : openIcon || 'chevron-down'
                  }
                />
              </span>
            ) : null}
            {headerCustomComponent ? <div>{headerCustomComponent}</div> : null}
          </VCardHeader>
        ) : null}
        <VCardBody bodyPadding={bodyPadding} backgroundColor={backgroundColor}>
          {collapse ? (
            <Collapse
              transitionDuration={transitionDuration || 200}
              keepChildrenMounted={keepChildrenMounted}
              isOpen={isOpen}
            >
              {children}
            </Collapse>
          ) : (
            children
          )}
        </VCardBody>
      </VCard>
    );
  }
}
