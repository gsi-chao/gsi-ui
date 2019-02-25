import React, { Component } from 'react';
import {
  Accordion,
  AccordionTitleProps,
  Icon,
  Segment,
  SemanticICONS
} from 'semantic-ui-react';
import { accordionStyle, TitleM, titleIcon, titleStyle } from './style';

interface IAccordionState {
  activeIndex: any;
  icon: SemanticICONS;
}

interface IAccordionProps {
  title: string;
  titleBackgroundColor?: string;
  titleBorderColor?: string;
  iconActive: SemanticICONS;
  iconDeactivate: SemanticICONS;
  className?: string;
}

export class AccordionSummary extends Component<
  IAccordionProps,
  IAccordionState
> {
  constructor(props: IAccordionProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      icon: this.props.iconDeactivate
    };
  }

  handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    e.preventDefault();
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const { iconActive, iconDeactivate } = this.props;
    const newIndex = index === activeIndex ? -1 : index;
    const icon = index === activeIndex ? iconActive : iconDeactivate;
    this.setState({ icon, activeIndex: newIndex });
  };

  render() {
    const {
      title,
      titleBackgroundColor,
      titleBorderColor,
      className
    } = this.props;
    const { activeIndex, icon } = this.state;

    return (
      <Accordion styled style={accordionStyle} className={className}>
        <TitleM
          background={titleBackgroundColor}
          border={titleBorderColor}
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon style={titleIcon} name={icon} />
          <span>{title}</span>
        </TitleM>
        <Accordion.Content active={activeIndex === 0}>
          {this.props.children}
        </Accordion.Content>
      </Accordion>
    );
  }
}
