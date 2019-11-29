import React, { useEffect, useState } from 'react';
import { ITabsPanelProps, ITabsPanelState } from './types';
import { VTabPanel } from './TabPanel/TabPanel';
import {
  ContainerContent,
  ContainerTabs,
  ContainerTabsPanel,
  TabsSpaceFiller
} from './style';
import { Alert } from '@blueprintjs/core';
import CarouselMultiple from '../Scroll/CarouselMultiple/VCarouselMultiple';
import ItemSC from '../Scroll/CarouselMultiple/components/Item';

export const VTabsPanel = (props: ITabsPanelProps) => {
  const getContent = (key: any = props.tabList[0].key) => {
    let content: any = props.tabList[0].content;
    props.tabList.forEach(tab => {
      if (tab.key === key) {
        content = tab.content;
      }
    });
    return content;
  };
  const [state, setState] = useState<ITabsPanelState>({
    active: props.active ? props.active : props.tabList[0].key,
    content: getContent(props.active),
    possibleKey: ''
  });

  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] = useState(
    false
  );
  useEffect(() => {
    setState({
      active: state.active,
      content: getContent(state.active),
      possibleKey: ''
    });
  }, [props.tabList]);
  useEffect(() => {
    const act = `${props.active}`;
    setState({
      active: act,
      content: getContent(act),
      possibleKey: ''
    });
  }, [props.active]);

  const toggleIsOpenDialogOpen = () => {
    setIsOpenConfirmationDialog(!isOpenConfirmationDialog);
  };

  const handleChangeTab = (key: string) => {
    if (props.beforeChangeTabValidation && state.active !== key) {
      toggleIsOpenDialogOpen();
      setState({ ...state, possibleKey: key });
    } else {
      changeTab(key);
    }
  };
  const changeTab = (key: string) => {
    props.tabList.forEach(item => {
      if (item.key === key) {
        props.handleChange(item);
        setState({ ...state, active: key, content: item.content });
      }
    });
  };

  const handleOkConfirmation = () => {
    changeTab(state.possibleKey);
    toggleIsOpenDialogOpen();
  };
  const { tabsAlertProps, ...options } = props;
  const { active, content } = state;

  return (
    <ContainerTabsPanel>
      <ContainerTabs
        borderBottom={options.borderBottom}
        activeColor={options.activeColor}
        lineColor={options.lineColor}
      >
        <CarouselMultiple padding={props.tabsTagsContainerPadding}>
          {options.tabList
            .filter(tab => !tab.hidden)
            .map(tab => (
              <ItemSC className="item" key={tab.key}>
                <VTabPanel
                  backgroundColor={options.backgroundColor}
                  key={tab.key}
                  id={tab.key}
                  handleOnClick={handleChangeTab}
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
                  padding={options.tabsTagItemPadding}
                />
              </ItemSC>
            ))}
        </CarouselMultiple>

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
        intent={(tabsAlertProps && tabsAlertProps.intent) || 'warning'}
        icon={(tabsAlertProps && tabsAlertProps.icon) || 'warning-sign'}
        style={(tabsAlertProps && tabsAlertProps.style) || {}}
        className={(tabsAlertProps && tabsAlertProps.className) || ''}
        isOpen={isOpenConfirmationDialog}
        onCancel={toggleIsOpenDialogOpen}
        onConfirm={handleOkConfirmation}
      >
        <p>
          {(tabsAlertProps && tabsAlertProps.bodyText) ||
            `Changes will be lost!`}
        </p>
      </Alert>
    </ContainerTabsPanel>
  );
};
