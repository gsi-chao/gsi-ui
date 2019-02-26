import {
  IconName,
  Toaster,
} from '@blueprintjs/core';
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
  let {
    action,
    className,
    icon,
    message,
    onDismiss,
    timeout,
    type,
    noIcon
  } = props;
  type = type || 'none';
  let iconFromType: IconName =
    type === 'success'
      ? 'tick'
      : type === 'warning'
      ? 'warning-sign'
      : type === 'danger'
      ? 'delete'
      : 'blank';
  const ToastProps = {
    message,
    intent: type,
    timeout: timeout || 3000,
    icon: icon || iconFromType,
    onDismiss,
    action,
    className
  };

  if (noIcon || ToastProps.icon === 'blank') {
    delete ToastProps.icon;
  }

  if (!notifications) {
    notifications = Toaster.create({
      canEscapeKeyClear: true,
      className,
      position: 'top-right',
    });
  }

  notifications.show(ToastProps);
};
