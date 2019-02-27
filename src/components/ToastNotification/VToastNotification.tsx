import { IconName, Toaster } from '@blueprintjs/core';
import React from 'react';
import { ToastType } from './types';

export interface IToastNotificationProps {
  message: any;
  type?: ToastType;
  timeout?: number;
  onDismiss?: any;
  className?: any;
  action?: any;
  icon?: IconName;
  noIcon?: boolean;
}

let notifications: any = undefined;

export const showToastNotification = (props: IToastNotificationProps) => {
  const {
    action,
    className,
    icon,
    message,
    onDismiss,
    timeout,
    noIcon
  } = props;
  let type = props.type;
  type = type || 'none';
  const iconFromType: IconName =
    type === 'success'
      ? 'tick'
      : type === 'warning'
      ? 'warning-sign'
      : type === 'danger'
      ? 'delete'
      : 'blank';
  const ToastProps = {
    message,
    onDismiss,
    action,
    className,
    intent: type,
    timeout: timeout || 3000,
    icon: icon || iconFromType
  };

  if (noIcon || ToastProps.icon === 'blank') {
    delete ToastProps.icon;
  }

  if (!notifications) {
    notifications = Toaster.create({
      className,
      canEscapeKeyClear: true,
      position: 'top-right'
    });
  }

  notifications.show(ToastProps);
};
