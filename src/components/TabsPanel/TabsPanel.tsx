import React, { Component } from 'react';
import { ITabsPanelProps, ITabsPanelState } from './types';
import { VTabPanel } from './TabPanel/TabPanel';
import {
  ContainerContent,
  ContainerTabs,
  ContainerTabsPanel,
  TabsSpaceFiller
} from './style';
import { Alert } from '@blueprintjs/core';

export class VTabsPanel extends Component<ITabsPanelProps, ITabsPanelState> {
  constructor(props: ITabsPanelProps) {
    super(props);

    this.state = {
      isOpenConfirmationDialog: false,
      active: this.props.active ? this.props.active : this.props.tabList[0].key,
      content: this.getContent(this.props.active),
      possibleKey: ''
    };
  }

  getContent(key: any = this.props.tabList[0].key) {
    let content: any = this.props.tabList[0].content;
    this.props.tabList.forEach(tab => {
      if (tab.key === key) {
        content = tab.content;
      }
    });
    return content;
  }

  toggleIsOpenDialogOpen = () => {
    this.setState({
      isOpenConfirmationDialog: !this.state.isOpenConfirmationDialog,
      possibleKey: ''
    });
  };

  public render() {
    const { tabsAlertProps, ...options } = this.props;
    const { active, content, isOpenConfirmationDialog } = this.state;
    return (
      <ContainerTabsPanel>
        <ContainerTabs
          borderBottom={options.borderBottom}
          activeColor={options.activeColor}
          lineColor={options.lineColor}
        >
          {options.tabList.map(tab => (
            <VTabPanel
              backgroundColor={options.backgroundColor}
              key={tab.key}
              id={tab.key}
              handleOnClick={this.handleChangeTab}
              label={tab.label!}
              active={active === tab.key}
              icon={tab.icon}
              textColor={options.textColor}
              borderColor={options.borderColor}
              activeColor={options.activeColor}
              activeTextColor={options.activeTextColor}
              textColorBadge={tab.textColorBadge}
              backgroundColorBadge={tab.backgroundColorBadge}
              dataBadge={tab.dataBadge}
              size={options.size}
              activeBorderColor={options.activeBorderColor}
            />
          ))}
          <TabsSpaceFiller />
        </ContainerTabs>
        <ContainerContent
          backgroundColor={options.backgroundColor}
          padding={options.padding}
          borderColor={options.borderColor}
          elevation={options.elevation}
        >
          {content}
        </ContainerContent>
        <Alert
          canEscapeKeyCancel={
            (tabsAlertProps && tabsAlertProps.canEscapeKeyCancel) || false
          }
          canOutsideClickCancel={
            tabsAlertProps && tabsAlertProps.canOutsideClickCancel && true
          }
          cancelButtonText={
            (tabsAlertProps && tabsAlertProps.cancelButtonText) || 'Cancel'
          }
          confirmButtonText={
            (tabsAlertProps && tabsAlertProps.confirmButtonText) || 'Ok'
          }
          intent={(tabsAlertProps && tabsAlertProps.intent) || 'none'}
          icon={(tabsAlertProps && tabsAlertProps.icon) || 'warning-sign'}
          style={(tabsAlertProps && tabsAlertProps.style) || {}}
          className={(tabsAlertProps && tabsAlertProps.className) || ''}
          isOpen={isOpenConfirmationDialog}
          onCancel={this.toggleIsOpenDialogOpen}
          onConfirm={this.handleOkConfirmation}
        >
          <p>
            {(tabsAlertProps && tabsAlertProps.bodyText) ||
              `Changes will be lost!`}
          </p>
        </Alert>
      </ContainerTabsPanel>
    );
  }

  changeTab = (key: string) => {
    this.setState({ active: key });
    this.props.tabList.forEach(item => {
      if (item.key === key) {
        this.setState({ content: item.content });
        this.props.handleChange(item);
      }
    });
  };

  handleOkConfirmation = () => {
    this.changeTab(this.state.possibleKey);
    this.toggleIsOpenDialogOpen();
  };

  handleChangeTab = (key: string) => {
    if (this.props.beforeChangeTabValidation) {
      this.toggleIsOpenDialogOpen();
      this.setState({ possibleKey: key });
    } else {
      this.changeTab(key);
    }
  };
}
