import { Collapse, Elevation, Icon, IconName } from '@blueprintjs/core';
import { VCard, VCardBody, VCardHeader, VCardTextSpan, VCardTextSpanContainer } from './style';
import React, { Component } from 'react';
import { FlexJustify, HeaderOrientation } from './types';

export interface StyledCardProps {
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
  headerTextUppercase?: boolean;
  headerTextBold?: boolean;
  className?: string;
  defaultActive?: boolean;
  headerCustomComponent?: any;
  heigthHeaderPx?: number;
  headerCustomButton?: any;
  onHeaderMouseDrag?: any;
  onHeaderFocus?: any;
  id?: string;
  headerTextComponent?: any;
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
      children,
      backgroundColor,
      cardElevation,
      height,
      width,
      collapse,
      transitionDuration,
      bodyPadding,
      keepChildrenMounted,
      noHeader,
      className,
      id
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
        id={id}
      >
        {!noHeader ? (
          <VCardHeader
            headerBackgroundColor={this.props.headerBackgroundColor}
            headerOrientation={this.props.headerOrientation}
            headerJustifyContent={this.props.headerHorizontalAlign}
            heigthHeaderPx={this.props.heigthHeaderPx}
            onMouseDown={this.props.onHeaderMouseDrag}
            onClick={this.props.onHeaderFocus}
            className={'gsi-draggable-modal-title'}
          >
            <VCardTextSpanContainer>
              {this.props.headerTextComponent ? (
                <VCardTextSpan>{this.props.headerTextComponent}</VCardTextSpan>
              ) : (
                <VCardTextSpan
                  headerColor={this.props.headerColor}
                  headerTextJustify={this.props.headerTextJustify}
                  headerTextUppercase={this.props.headerTextUppercase}
                  headerTextBold={this.props.headerTextBold}
                >
                  {this.props.headerCustomButton}
                  {this.props.headerIcon ? (
                    <Icon icon={this.props.headerIcon} />
                  ) : null}
                  <span>{this.props.headerText}</span>
                </VCardTextSpan>
              )}
            </VCardTextSpanContainer>
            {this.props.collapse ? (
              <span onClick={this.toggleCollapsed}>
                <Icon
                  icon={
                    this.state.isOpen
                      ? this.props.closeIcon || 'chevron-up'
                      : this.props.openIcon || 'chevron-down'
                  }
                />
              </span>
            ) : null}
            {this.props.headerCustomComponent ? (
              <div>{this.props.headerCustomComponent}</div>
            ) : null}
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
