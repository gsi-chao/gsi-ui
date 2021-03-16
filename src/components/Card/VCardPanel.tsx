import { Collapse, Icon } from '@blueprintjs/core';
import {
  VCard,
  VCardBody,
  VCardHeader,
  VCardTextSpan,
  VCardTextSpanContainer
} from './style';
import React, { useState } from 'react';
import { StyledVCardProps } from './types';
import { observer } from 'mobx-react';

export const VCardPanel = observer((props: StyledVCardProps) => {
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
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(props.defaultActive || false);

  const toggleCollapsed = () => {
    setIsOpen(!isOpen);
  };

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
          headerBackgroundColor={props.headerBackgroundColor}
          headerOrientation={props.headerOrientation}
          headerJustifyContent={props.headerHorizontalAlign}
          heigthHeaderPx={props.heigthHeaderPx}
          onMouseDown={props.onHeaderMouseDrag}
          onClick={props.onHeaderFocus}
          className={props.headerClass}
        >
          <VCardTextSpanContainer>
            {props.headerTextComponent ? (
              <VCardTextSpan>{props.headerTextComponent}</VCardTextSpan>
            ) : (
              <VCardTextSpan
                headerColor={props.headerColor}
                headerTextJustify={props.headerTextJustify}
                headerTextUppercase={props.headerTextUppercase}
                headerTextBold={props.headerTextBold}
              >
                {props.headerCustomButton}
                {props.headerIcon ? <Icon icon={props.headerIcon} /> : null}
                <span>{props.headerText}</span>
              </VCardTextSpan>
            )}
          </VCardTextSpanContainer>
          {props.collapse ? (
            <span onClick={toggleCollapsed}>
              <Icon
                icon={
                  isOpen
                    ? props.closeIcon || 'chevron-up'
                    : props.openIcon || 'chevron-down'
                }
              />
            </span>
          ) : null}
          {props.headerCustomComponent ? (
            <div>{props.headerCustomComponent}</div>
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
});
